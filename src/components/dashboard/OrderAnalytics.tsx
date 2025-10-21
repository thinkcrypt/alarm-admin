'use client';

import React, { FC } from 'react';
import { Grid, Heading, Text, Flex } from '@chakra-ui/react';
import { Column, Align, DynamicFilters, Count, Sum, ShowSum } from '@/components/library';
import { useSum, useAppSelector } from '@/components/library';

type OrderAnalyticsProps = {
	title: string;
};

const OrderAnalytics: FC<OrderAnalyticsProps> = ({ title }) => {
	const { filters } = useAppSelector((state: any) => state.table);

	const getUpdatedFilters = (filters: any) => {
		return {
			...(filters?.createdAt_btwn && { date_btwn: filters?.createdAt_btwn }),
			...(filters?.createdAt_eq && { date_eq: filters?.createdAt_eq }),
			...(filters?.createdAt_last && { date_last: filters?.createdAt_last }),
			...(filters?.createdAt_gte && { date_gte: filters?.createdAt_gte }),
			...(filters?.createdAt_lte && { date_lte: filters?.createdAt_lte }),
		};
	};

	const netProfit: number = useSum({ path: 'orders', field: 'profit', filters });
	const expenses: number = useSum({
		path: 'expenses',
		field: 'amount',
		filters: getUpdatedFilters(filters),
	});
	return (
		<>
			<Grid
				gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
				gap={2}>
				<Count
					title='Total Orders'
					path='orders'
					filters={filters}
				/>
				<Sum
					title='Order Value'
					path='orders'
					field='total'
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

				<Sum
					title='Invoice Due'
					path='orders'
					field='dueAmount'
					filters={filters}
					price
				/>

				<Sum
					title='Expenses'
					path='expenses'
					field='amount'
					filters={getUpdatedFilters(filters)}
					price
				/>
				<ShowSum
					tooltip='Net Profit = Gross Profit - Expenses'
					title='Net Profit'
					price>
					{netProfit - expenses}
				</ShowSum>
			</Grid>
		</>
	);
};

export default OrderAnalytics;
