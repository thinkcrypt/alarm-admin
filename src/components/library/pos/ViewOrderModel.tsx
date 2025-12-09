'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Flex,
	Heading,
	useColorModeValue,
	Drawer,
	DrawerOverlay,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Grid,
	Text,
	Button,
} from '@chakra-ui/react';

import PosInput from './PosInput';

import {
	ModalContainer,
	Column,
	VTextarea,
	useGetByIdQuery,
	Align,
	MenuItem,
	useUpdateByIdMutation,
	useCustomToast,
	useIsMobile,
	OrderItems,
	OrderListGrid,
	DetailItem,
	useExportMutation,
} from '..';
import { OrderAddress, OrderButton, OrderCustomer } from './pos-card/odder';

const ViewOrderModal = ({ id }: { id: string }) => {
	const markedRef = useRef(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data, isFetching, isError, isSuccess, refetch } = useGetByIdQuery(
		{
			id: id,
			path: 'orders',
		},
		{ skip: !isOpen }
	);
	const [status, setStatus] = useState();

	const [trigger, result] = useUpdateByIdMutation();
	const [triggerInvoice, resultInvoice] = useExportMutation();
	const onModalOpen = () => {
		markedRef.current = false;
		onOpen();
		refetch();
	};

	const onModalClose = () => {
		markedRef.current = false;
		setStatus(data?.status);
		onClose();
	};
	// download invoice
	const handleExport = () => {
		triggerInvoice({
			path: 'orders',
			body: { id: data?._id, invoice: data?.invoice, test: 'test' },
			type: 'invoice/dl',
		});
	};
	// for handling isNew
	useEffect(() => {
		if (!isOpen) return; // ✅ only run while modal open
		if (!data?._id) return;
		if (!data.isNewOrder) return;
		if (markedRef.current) return;

		markedRef.current = true;

		trigger({
			path: 'orders',
			id: data._id,
			body: { isNewOrder: false },
			// don't invalidate getById here to avoid a loop
			invalidate: ['orders'], // only list tag if you need list refresh
		});
	}, [isOpen, data?._id, data?.isNewOrder, trigger]);
	//
	useEffect(() => {
		if (!isFetching && isSuccess) setStatus(data?.status);
	}, [isFetching]);

	const borderColor = useColorModeValue('#bbb', 'stroke.deepD');

	const onUpdate = () => {
		trigger({ id: id, body: { status }, path: 'orders' });
	};

	useCustomToast({
		successText: 'Order status updated successfully',
		isSuccess: result?.isSuccess,
		isError: result?.isError,
		isLoading: result?.isLoading,
		error: result?.error,
	});

	const renderLeftSection = <OrderItems data={data} />;

	const renderRightSection = (
		<>
			<Align
				py={3}
				borderBottom='1px dashed'
				borderTop='1px dashed'
				borderColor={borderColor}
			>
				<Heading size='sm'>Billing Details</Heading>
			</Align>

			<PosInput
				valueType='price'
				value={data?.dueAmount}
				label='Total Due'
				isDisabled
			/>
			<PosInput
				value={data?.paidAmount}
				isDisabled
				label='Paid Amount'
				valueType='price'
			/>
			<PosInput
				isDisabled
				value={data?.paymentMethod}
				valueType='text'
				label='Payment Method'
			/>
			<PosInput
				value={status}
				onChange={(e: any) => setStatus(e.target.value)}
				valueType='select'
				label='Order Status'
				options={[
					'pending',
					'order-placed',
					'confirmed',
					'out-for-delivery',
					'delivered',
					'completed',
					'cancelled',
				]}
			/>
			<VTextarea value={data?.note} isDisabled label='Note' />
		</>
	);

	const isSmallScreen = useIsMobile();

	const Container = isSmallScreen ? Drawer : Modal;
	const Overlay = isSmallScreen ? DrawerOverlay : ModalOverlay;
	const CloseButton = isSmallScreen ? DrawerCloseButton : ModalCloseButton;
	const Header = isSmallScreen ? DrawerHeader : ModalHeader;
	const Body = isSmallScreen ? DrawerBody : ModalBody;
//build
	return (
		<>
			<MenuItem onClick={onModalOpen}>View Order</MenuItem>

			<Container
				{...(!isSmallScreen && { isCentered: true })}
				{...(isSmallScreen && { placement: 'bottom' })}
				closeOnOverlayClick={false}
				size='5xl'
				isOpen={isOpen}
				onClose={onModalClose}
			>
				<Overlay />
				<ModalContainer isSmallScreen={isSmallScreen}>
					<Header>
						Order Details
						<Item title='Order Date:'>
							{new Date(data?.orderDate).toLocaleString()}
						</Item>
						<Item title='Order From:'>{data?.origin}</Item>
						<Item title='Invoice:'>#{data?.invoice}</Item>
						<OrderCustomer data={data?.address} />
						{data?.address && <OrderAddress address={data?.address} />}
						<Flex marginTop={2}>
							<Button
								size='xs'
								onClick={handleExport}
								loadingText='Preparing...'
								isLoading={result.isLoading}
							>
								Download Invoice
							</Button>
						</Flex>
					</Header>
					<CloseButton />
					{data && (
						<Body>
							<OrderListGrid>
								<Flex flexDirection='column'>{renderLeftSection}</Flex>
								<Column flex={1} gap={4}>
									<Column gap={2} flex={1}>
										{renderRightSection}
									</Column>

									<OrderButton
										isLoading={result?.isLoading}
										onClick={onUpdate}
										isDisabled={!data || status == data?.status}
									>
										Update Order
									</OrderButton>
								</Column>
							</OrderListGrid>
						</Body>
					)}
				</ModalContainer>
			</Container>
		</>
	);
};
const Item = ({ children, title }: { children: ReactNode; title: string }) => {
	return (
		<Flex gap={2} paddingTop={1}>
			<Text {...headingStyle}>{title}</Text>
			<Text fontSize={FONT_SIZE} fontWeight={'400'}>
				{children}
			</Text>
		</Flex>
	);
};

export default ViewOrderModal;
const FONT_SIZE = '.875rem';
const headingStyle = {
	fontSize: FONT_SIZE,
	fontWeight: '600',
};
