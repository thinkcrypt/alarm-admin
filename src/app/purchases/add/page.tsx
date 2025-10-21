'use client';
import React, { ReactNode, useState } from 'react';
import {
	useIsMobile,
	Column,
	VInput,
	useRedirect,
	usePostMutation,
	ShadowContainer as Container,
	shadow,
	VDataMenu,
	createFormFields,
	useCustomToast,
	Tr,
	PurchaseProduct,
	CreateNav,
	CreateBody,
	sizes,
	radius,
} from '@/components/library';
import {
	Grid,
	Table,
	Thead,
	Tbody,
	Th,
	TableContainer,
	Button,
	useToast,
	GridProps,
	Text,
} from '@chakra-ui/react';

import schema from '@/models/supplier/supplier.schema';
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
	},
	{
		content: 'Unit Cost Price',
	},
	{
		content: 'SubTotal',
		isNumeric: true,
	},
	{
		content: 'delete',
	},
];

const formFields = {
	supplier: {
		name: 'supplier',
		label: 'Supplier',
		isRequired: true,
		model: 'suppliers',
	},
	date: {
		name: 'date',
		label: 'Purchase Date',
		type: 'date',

		isRequired: true,
	},
	subTotal: {
		name: 'subTotal',
		label: 'Sub Total',
		type: 'number',
		isReadOnly: true,
		isRequired: true,
	},
	shippingCost: {
		name: 'shippingCost',
		label: 'Shipping Cost',
		type: 'number',
		isRequired: true,
	},
	paidAmount: {
		name: 'paidAmount',
		label: 'Paid Amount',
		type: 'number',
		isRequired: true,
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

const addSupplierModel = createFormFields({
	schema,
	layout: [
		{
			sectionTitle: 'Supplier Information',
			fields: ['name', 'email', 'phone', 'address'],
		},
	],
});

const CreatePurchase = () => {
	const isMobile = useIsMobile();
	const toast = useToast();

	const [formData, setFormData] = useState({
		subTotal: 0,
		total: 0,
		shippingCost: 0,
		paidAmount: 0,
		date: new Date().toISOString(),
		supplier: '',
	});

	const [items, setItems] = useState<any>([]);

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const setItem = ({ item, qty, price }: { item: any; price: any; qty: number }) => {
		// Create a new array with the updated items
		const newItems: any[] = items.map((existingItem: any) => {
			if (existingItem._id === item._id) {
				return {
					...existingItem,
					qty: qty,
					price: price,
					subTotal: price * qty,
				};
			}
			return existingItem;
		});

		setItems(newItems);
	};

	const deleteItem = (_id: string) => {
		setItems((prevItems: any) => prevItems.filter((item: any) => item._id !== _id));
	};

	const [trigger, result] = usePostMutation();

	useCustomToast({
		...result,
		successText: 'Purchase created successfully',
	});

	useRedirect({
		isSuccess: result?.isSuccess,
		path: `/purchases/${result?.data?._id}`,
		isLoading: result?.isLoading,
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (items?.length === 0) {
			toast({
				title: 'Error',
				description: 'Please add at least one product',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			return;
		}
		trigger({
			invalidate: ['purchases', 'products'],
			path: 'purchases',
			body: {
				...formData,
				items,
				dueAmount:
					items?.reduce((acc: number, item: any) => acc + item.subTotal, 0) +
					Number(formData.shippingCost) -
					Number(formData.paidAmount),
				subTotal: items?.reduce((acc: number, item: any) => acc + item.subTotal, 0),
				total:
					items?.reduce((acc: number, item: any) => acc + item.subTotal, 0) +
					Number(formData.shippingCost),
			},
		});
	};

	const handleSelectProduct = (e: any) => {
		const { value } = e.target;
		console.log('value is', value);
		const ifExists = items?.some((item: any) => item?._id === value?._id);

		if (ifExists) {
			toast({
				title: 'Error',
				description: 'Item already added',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
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

	const inputs = (
		<>
			<Row cols='1fr 1fr 1fr'>
				<VDataMenu
					{...formFields.supplier}
					dataModel={addSupplierModel}
					onChange={handleChange}
					value={formData.supplier}
				/>
				<VInput
					{...formFields.date}
					value={formData.date}
					onChange={handleChange}
				/>
				<VInput
					{...formFields.subTotal}
					value={items?.reduce((acc: number, item: any) => acc + item.subTotal, 0)}
					onChange={handleChange}
				/>
			</Row>
			<Row cols='1fr 1fr 1fr 1fr'>
				<VInput
					{...formFields.shippingCost}
					value={formData.shippingCost}
					onChange={handleChange}
				/>
				<VInput
					{...formFields.paidAmount}
					value={formData.paidAmount}
					onChange={handleChange}
				/>
				<VInput
					{...formFields.dueAmount}
					value={
						items?.reduce((acc: number, item: any) => acc + item.subTotal, 0) +
						Number(formData.shippingCost) -
						Number(formData.paidAmount)
					}
					onChange={handleChange}
				/>
				<VInput
					{...formFields.total}
					value={
						items?.reduce((acc: number, item: any) => acc + item.subTotal, 0) +
						Number(formData.shippingCost)
					}
					onChange={handleChange}
				/>
			</Row>
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
				{items?.map((item: any, i: number) => (
					<PurchaseProduct
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
				title='Purchase'
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
						<Container>{inputs}</Container>
					</Grid>
					<MintTableContainer>{table}</MintTableContainer>
				</Column>
			</CreateBody>
		</form>
	);
};

const MintTableContainer = ({ children }: { children: ReactNode }) => (
	<TableContainer
		bg={'background.light'}
		_light={{
			borderColor: 'container.borderLight',
		}}
		_dark={{ bg: { base: 'transparent', md: 'menu.dark' } }}
		p={{ base: 0, md: 4 }}
		borderRadius={radius.CONTAINER}
		boxShadow={shadow.DASH}
		borderWidth={1}>
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
