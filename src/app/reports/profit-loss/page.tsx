'use client';

import React from 'react';
import { NextPage } from 'next';
import {
	Layout,
	DateFilter,
	Sum,
	useAppSelector,
	useSum,
	ShowSum,
	TableObjectProps,
	convertToTableFields,
	Column,
	SpaceBetween,
} from '@/components/library';
import { Grid, Heading } from '@chakra-ui/react';
import schema from '@/models/order/order.schema';
import TableCustom from '@/components/library/sections/table/TableCustom';

const orderTable: TableObjectProps = {
	title: 'Orders',
	path: 'orders',
	export: false,
	search: false,
	hidePreferences: true,
	filters: false,
	pagination: false,
	topPagination: true,
	limit: 5,
	preferences: ['invoice', 'profit'],
	data: convertToTableFields({ schema, fields: ['invoice', 'profit'] }),
	showMenu: false,
};

const Container = ({ children, ...props }: any) => (
	<Grid
		gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
		gap={2}
		{...props}>
		{children}
	</Grid>
);

const ProfitLossPage: NextPage = () => {
	const { filters } = useAppSelector((state: any) => state.table);
	const netProfit: number = useSum({ path: 'orders', field: 'profit', filters });

	const getUpdatedFilters = (filters: any) => {
		return {
			...(filters?.createdAt_btwn && { date_btwn: filters?.createdAt_btwn }),
			...(filters?.createdAt_eq && { date_eq: filters?.createdAt_eq }),
			...(filters?.createdAt_last && { date_last: filters?.createdAt_last }),
			...(filters?.createdAt_gte && { date_gte: filters?.createdAt_gte }),
			...(filters?.createdAt_lte && { date_lte: filters?.createdAt_lte }),
		};
	};

	const expenses: number = useSum({
		path: 'expenses',
		field: 'amount',
		filters: getUpdatedFilters(filters),
	});

	return (
		<Layout
			title='Profit/Loss Report'
			path='/reports/profit-loss'>
			<DateFilter
				title='Filter By Date'
				field='date'
				label='Sort by Date'
			/>
			<Container>
				<Sum
					title='Inventory Value [By purchase price]'
					path='products'
					field='inventoryCostPrice'
					filters={filters}
					price
				/>
				<Sum
					title='Inventory Value [By selling price]'
					path='products'
					field='inventorySellPrice'
					filters={filters}
					price
				/>
			</Container>
			<Container>
				<Sum
					title='Total Purchase'
					path='purchases'
					field='total'
					filters={filters}
					price
				/>
				<Sum
					title='Total Expense'
					path='expenses'
					field='amount'
					filters={filters}
					price
				/>
				<Sum
					title='Total Sell Shipping'
					path='orders'
					field='shippingCharge'
					filters={filters}
					price
				/>
				<Sum
					title='Total Sell Discount'
					path='orders'
					field='discount'
					filters={filters}
					price
				/>
				<Sum
					title='Total Sell VAT'
					path='orders'
					field='vat'
					filters={filters}
					price
				/>
				<Sum
					title='Total Sell Return'
					path='orders'
					field='returnAmount'
					filters={filters}
					price
				/>
			</Container>
			<Grid
				gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
				gap={2}>
				<Sum
					title='COGS'
					path='orders'
					field='subTotal'
					tooltip='Cost of Goods Sold'
					filters={filters}
					price
				/>
				<Sum
					title='Gross Profit'
					path='orders'
					field='profit'
					filters={filters}
					price
				/>
				<ShowSum
					tooltip='Net Profit = Gross Profit - Expenses'
					title='Net Profit'
					price>
					{netProfit - expenses}
				</ShowSum>
			</Grid>
			<Column
				gap={2}
				py={6}
				pb={2}>
				<SpaceBetween align='center'>
					<Heading size='md'>Profit By Invoice</Heading>
				</SpaceBetween>
				<TableCustom table={orderTable} />
			</Column>
		</Layout>
	);
};

export default ProfitLossPage;
