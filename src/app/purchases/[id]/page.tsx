'use client';
import React, { ReactNode } from 'react';
import {
	Layout,
	useIsMobile,
	Column,
	VInput,
	ShadowContainer as Container,
	shadow,
	Tr,
	useGetByIdQuery,
	CustomTd as Td,
	sizes,
	PageHeading,
	SimplePageHeading,
} from '@/components/library';
import {
	Grid,
	Table,
	Thead,
	Tbody,
	Th,
	TableContainer,
	useToast,
	GridProps,
	Center,
	Spinner,
} from '@chakra-ui/react';

import { useParams } from 'next/navigation';
import dataFields from '@/models/products/viewAllProductModel';
type HeadingProps = {
	content: string;
	isNumeric?: boolean;
};

const HEADINGS: HeadingProps[] = [
	{
		content: '#',
	},
	{
		content: 'Product Name',
	},
	{
		content: 'Qty',
		isNumeric: true,
	},
	{
		content: 'Delivered Qty',
		isNumeric: true,
	},
	{
		content: 'Unit Cost Price',
		isNumeric: true,
	},
	{
		content: 'SubTotal',
		isNumeric: true,
	},
];

const formFields = {
	invoice: {
		name: 'invoice',
		label: 'Invoice',
		type: 'string',
		isReadOnly: true,
	},
	supplier: {
		name: 'supplier',
		label: 'Supplier',

		type: 'string',
		isReadOnly: true,
	},
	date: {
		name: 'date',
		label: 'Purchase Date',
		type: 'string',
	},
	subTotal: {
		name: 'subTotal',
		label: 'Sub Total',
		type: 'number',
		isReadOnly: true,
	},
	shippingCost: {
		name: 'shippingCost',
		label: 'Shipping Cost',
		type: 'number',
		isReadOnly: true,
	},
	paidAmount: {
		name: 'paidAmount',
		label: 'Paid Amount',
		type: 'number',
		isReadOnly: true,
	},
	status: {
		name: 'status',
		label: 'Status',
		type: 'string',
		isReadOnly: true,
	},
	isDelivered: {
		name: 'isDelivered',
		label: 'Is Delivered',
		type: 'boolean',
		isReadOnly: true,
	},
	dueAmount: {
		name: 'dueAmount',
		label: 'Due Amount',
		type: 'number',
		isReadOnly: true,
	},
	total: {
		name: 'total',
		label: 'Total',
		type: 'number',
		isReadOnly: true,
	},
};

const table = {
	isModal: true,
	path: 'purchases',
	button: {
		title: 'Add Purchase',
	},
};

const CreatePurchase = () => {
	const isMobile = useIsMobile();
	const toast = useToast();
	const { id } = useParams();

	const { data, isLoading } = useGetByIdQuery(
		{
			path: 'purchases',
			id,
		},
		{ skip: !id }
	);

	const inputs = (
		<>
			<Row cols='1fr 1fr 1fr 1fr'>
				<VInput
					{...formFields.invoice}
					value={data?.invoice}
				/>
				<VInput
					{...formFields.supplier}
					value={data?.supplier?.name}
				/>
				<VInput
					{...formFields.date}
					value={data?.date}
				/>
				<VInput
					{...formFields.subTotal}
					value={data?.subTotal}
				/>
			</Row>
			<Row cols='1fr 1fr 1fr'>
				<VInput
					{...formFields.status}
					value={data?.status}
				/>
				<VInput
					{...formFields.isDelivered}
					value={data?.isDelivered?.toString()}
				/>
				<VInput
					{...formFields.shippingCost}
					value={data?.shippingCost}
				/>

				<VInput
					{...formFields.paidAmount}
					value={data?.paidAmount}
				/>
				<VInput
					{...formFields.dueAmount}
					value={data?.dueAmount}
				/>
				<VInput
					{...formFields.total}
					value={data?.total}
				/>
			</Row>
		</>
	);

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
				{data?.items?.map((item: any, i: number) => (
					<Tr key={i}>
						<Td heading='#'>{i + 1}</Td>
						<Td heading='Product Name'>{item?.name}</Td>

						<Td
							heading='Qty'
							isNumeric={!isMobile && true}>
							{item?.qty}
						</Td>

						<Td
							heading='Delivered Qty'
							isNumeric={!isMobile && true}>
							{item?.deliveredQty}
						</Td>

						<Td
							isNumeric={!isMobile && true}
							heading='Cost Price'>
							{item?.price}
						</Td>
						<Td
							isNumeric
							heading='SubTotal'>
							{item?.subTotal}
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);

	if (!data)
		return (
			<Layout
				title='Purchase'
				path='purchases'>
				<Center>
					<Spinner />
				</Center>
			</Layout>
		);

	return (
		<Layout
			title={`Purchase #${data?.invoice}`}
			path='purchases'>
			<SimplePageHeading
				{...(!data?.isDelivered && { button: 'Update Status' })}
				{...(!data?.isDelivered && { isModal: true })}
				title={`Purchase #${data?.invoice}`}
				path='purchases'
				type='update'
				id={data?._id}
				data={[
					{
						name: 'status',
						label: 'Status',
						type: 'select',
						options: [
							{ label: 'Pending', value: 'pending' },
							{ label: 'Processing', value: 'processing' },
							{ label: 'Delivered', value: 'delivered' },
						],
					},
				]}
			/>
			<Column
				gap={4}
				pb='64px'>
				<Grid
					gridTemplateColumns={{ base: '1fr', md: '1fr' }}
					gap={6}>
					<Container>{inputs}</Container>
				</Grid>
				<MintTableContainer>{table}</MintTableContainer>
			</Column>
		</Layout>
	);
};

const MintTableContainer = ({ children }: { children: ReactNode }) => (
	<TableContainer
		bg={{ base: 'transparent', md: 'menu.light' }}
		_dark={{ bg: { base: 'transparent', md: 'menu.dark' } }}
		p={{ base: 0, md: 4 }}
		borderRadius={sizes.CARD_RADIUS}
		boxShadow={{ base: 'none', md: shadow.CARD }}
		borderWidth={{ base: 0, md: 1 }}>
		{children}
	</TableContainer>
);

const Row = ({ children, cols, ...props }: GridProps & { children: ReactNode; cols?: string }) => (
	<Grid
		gridTemplateColumns={{ base: '1fr 1fr', md: cols || '1fr 1fr' }}
		gap={2}
		{...props}>
		{children}
	</Grid>
);

export default CreatePurchase;
