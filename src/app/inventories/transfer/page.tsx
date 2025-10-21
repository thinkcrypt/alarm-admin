'use client';
import React, { FC, ReactNode, useState } from 'react';
import {
	useIsMobile,
	Column,
	useRedirect,
	FullForm,
	VDataMenu,
	useCustomToast,
	Tr,
	TransferProduct,
	CreateNav,
	CreateBody,
	MintTableContainer,
	useUpdateByIdMutation,
} from '@/components/library';
import { Grid, Table, Thead, Tbody, Th, useToast, GridProps } from '@chakra-ui/react';
import { formFields, HEADINGS, HeadingProps } from './_components';

const CreatePurchase = () => {
	const isMobile = useIsMobile();
	const toast = useToast();
	const [formData, setFormData] = useState({
		date: '',
		ref: '',
		status: '',
		reason: '',
		source: '',
		location: '',
	});

	const [items, setItems] = useState<any>([]);

	const setItem = ({ item, qty, price }: { item: any; price: any; qty: number }) => {
		// Create a new array with the updated items
		const newItems: any[] = items.map((existingItem: any) => {
			if (existingItem._id === item._id) {
				return {
					...existingItem,
					qty: qty,
					subTotal: price * qty,
				};
			}
			return existingItem;
		});

		setItems(newItems);
	};

	const deleteItem = (_id: string) =>
		setItems((prevItems: any) => prevItems.filter((item: any) => item._id !== _id));

	const [trigger, result] = useUpdateByIdMutation();

	useCustomToast({
		...result,
		successText: 'Transfer Log Created Successfully',
	});

	useRedirect({
		isSuccess: result?.isSuccess,
		path: `/transfers`,
		isLoading: result?.isLoading,
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (items?.length === 0) {
			toast(ErrorToastProps);
			return;
		}
		console.log('formData', { ...formData, items });
		trigger({
			invalidate: ['transfers', 'inventories', 'products'],
			path: 'inventories/transfer/product',
			id: 'bulk',
			body: {
				...formData,
				items,
			},
		});
	};

	const handleSelectProduct = (e: any) => {
		const { value } = e.target;

		const ifExists = items?.some((item: any) => item?._id === value?._id);

		if (ifExists) {
			toast(ErrorToastProps);
			return;
		}

		const newItem = {
			_id: value?._id,
			name: value?.name,
			price: value?.cost,
			qty: 1,
			subTotal: value?.cost,
		};

		setItems((prevData: any) => [...prevData, newItem]);
	};

	const table = (
		<Table size='sm'>
			<Thead {...(isMobile && { display: 'none' })}>
				<Tr>
					{HEADINGS.map((heading: HeadingProps, i: number) => (
						<Th
							isNumeric={heading?.isNumeric}
							key={i}>
							{heading?.content}
						</Th>
					))}
				</Tr>
			</Thead>

			<Tbody>
				{items?.map((item: any, i: number) => (
					<TransferProduct
						isMobile={isMobile}
						key={i}
						item={item}
						i={i}
						setItem={setItem}
						deleteItem={deleteItem}
					/>
				))}
			</Tbody>
		</Table>
	);

	return (
		<form onSubmit={handleSubmit}>
			<CreateNav
				isLoading={result?.isLoading}
				title='Transfer Stock'
				path='purchases'
			/>
			<CreateBody
				justify='flex-start'
				pt='92px'>
				<Column
					gap={4}
					pb='64px'>
					<Grid
						gridTemplateColumns={{ base: '1fr', md: '1fr' }}
						gap={4}>
						<MintTableContainer>
							<FullForm
								formData={formData}
								setFormData={setFormData}
								dataModel={formFields}
								layout={[4, 2]}
							/>
							<Row gridTemplateColumns='1fr'>
								<VDataMenu
									label='Add product'
									model='products'
									type='object'
									value={''}
									unselect={false}
									onChange={handleSelectProduct}
								/>
							</Row>
						</MintTableContainer>
					</Grid>
					<MintTableContainer>{table}</MintTableContainer>
				</Column>
			</CreateBody>
		</form>
	);
};

const ErrorToastProps: any = {
	title: 'Error',
	description: 'Please add at least one product',
	status: 'error',
	duration: 5000,
	isClosable: true,
	position: 'top-right',
};

const Row = ({ children, cols, ...props }: GridProps & { children: ReactNode; cols?: string }) => (
	<Grid
		pb={4}
		gridTemplateColumns={{ base: '1fr 1fr', md: cols || '1fr 1fr' }}
		gap={2}
		{...props}>
		{children}
	</Grid>
);

export default CreatePurchase;
