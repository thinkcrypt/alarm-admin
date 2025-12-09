'use client';

import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import {
	MenuItem,
	MenuModal,
	MenuModalBody,
	MenuModalCloseButton,
	MenuModalFooter,
	MenuModalHeader,
	VInput,
	VSelect,
	VSwitch,
	useCustomToast,
	useUpdateManyMutation,
} from '../../../..';

type Prompt = {
	title?: string;
	body?: string;
	successMsg?: string;
};

type BulkDiscountModalProps = {
	title?: string;
	path: string;
	items: string[];
	prompt?: Prompt;
};

const BulkDiscountModal: FC<BulkDiscountModalProps> = ({
	title = 'Add Discount',
	path,
	items,
	prompt,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isDiscount, setIsDiscount] = useState<boolean>(true);
	const [discountType, setDiscountType] = useState<'percentage' | 'flat' | ''>('percentage');
	const [discount, setDiscount] = useState<string>('');

	const [trigger, result] = useUpdateManyMutation();
	const { isLoading, isSuccess, isError, error, reset } = result;

	const closeModal = () => {
		reset();
		setIsDiscount(true);
		setDiscountType('percentage');
		setDiscount('');
		onClose();
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		const updates: Record<string, any> = { isDiscount };

		if (isDiscount) {
			updates.discountType = discountType;
			updates.discount = Number(discount);
		}

		trigger({
			path,
			body: {
				ids: items,
				type: 'string',
				updates,
			},
		});
	};

	useEffect(() => {
		if (!isLoading && isSuccess) {
			closeModal();
		}
	}, [isLoading, isSuccess]);

	useCustomToast({
		successText: prompt?.successMsg || 'Discount updated successfully',
		isSuccess,
		isError,
		isLoading,
		error,
	});

	const disableSubmit = isDiscount
		? !discountType || discount === '' || Number(discount) < 0
		: false;

	return (
		<>
			<MenuItem onClick={onOpen}>{title}</MenuItem>

			<MenuModal
				isOpen={isOpen}
				onClose={closeModal}>
				<form onSubmit={handleSubmit}>
					<MenuModalHeader>{prompt?.title || 'Add Discount'}</MenuModalHeader>
					<MenuModalCloseButton />

					<MenuModalBody
						pt={4}
						display='flex'
						flexDir='column'
						gap={4}>
						{prompt?.body && (
							<Text
								fontSize='sm'
								color='gray.500'>
								{prompt.body}
							</Text>
						)}

						<VSwitch
							label='Is Discount'
							isChecked={isDiscount}
							onChange={e => setIsDiscount(e.target.checked)}
						/>

						<VSelect
							label='Discount Type'
							value={discountType}
							onChange={e => setDiscountType(e.target.value as 'percentage' | 'flat' | '')}
							isDisabled={!isDiscount}
							defaultDisabled
							placeholder='Select discount type'>
							<option value='percentage'>Percentage</option>
							<option value='flat'>Flat</option>
						</VSelect>

						<VInput
							label='Discount Value'
							type='number'
							min={0}
							value={discount}
							onChange={e => setDiscount(e.target.value)}
							isDisabled={!isDiscount}
							placeholder='Enter discount amount'
						/>
					</MenuModalBody>

					<MenuModalFooter>
						{!isLoading && (
							<Button
								variant='white'
								onClick={closeModal}>
								Discard
							</Button>
						)}
						<Button
							ml={2}
							size='sm'
							colorScheme='brand'
							type='submit'
							isLoading={isLoading}
							isDisabled={disableSubmit}>
							Update
						</Button>
					</MenuModalFooter>
				</form>
			</MenuModal>
		</>
	);
};

export default BulkDiscountModal;
