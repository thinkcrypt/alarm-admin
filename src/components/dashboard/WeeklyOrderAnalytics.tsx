'use client';

import React, { FC, useMemo } from 'react';
import { Grid } from '@chakra-ui/react';
import { Count, Sum, ShowSum } from '@/components/library';
import { useSum, useAppSelector } from '@/components/library';

type WeeklyOrderAnalyticsProps = {
	title?: string;
};

// Week starts Saturday -> ends Friday (local time)
const getCurrentWeekRangeSatToFri = () => {
	const now = new Date();
	const day = now.getDay(); // Sun=0 .. Sat=6

	// how many days back to Saturday
	const diffToSaturday = (day + 1) % 7;

	const start = new Date(now);
	start.setDate(now.getDate() - diffToSaturday);
	start.setHours(0, 0, 0, 0);

	const end = new Date(start);
	end.setDate(start.getDate() + 6);
	end.setHours(23, 59, 59, 999);

	return { start, end };
};

// format as YYYY-MM-DD in LOCAL time (no UTC shift)
const formatYYYYMMDD = (d: Date) => {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
};

const WeeklyOrderAnalytics: FC<WeeklyOrderAnalyticsProps> = () => {
	const { filters } = useAppSelector((state: any) => state.table);

	const weekOrderFilters = useMemo(() => {
		const { start, end } = getCurrentWeekRangeSatToFri();

		const startStr = formatYYYYMMDD(start);
		const endStr = formatYYYYMMDD(end);

		// strip any existing createdAt filters to avoid conflicts
		const {
			createdAt_btwn,
			createdAt_eq,
			createdAt_last,
			createdAt_gte,
			createdAt_lte,
			...rest
		} = filters || {};

		return {
			...rest,
			createdAt_btwn: `${startStr}_${endStr}`,
		};
	}, [filters]);

	const weekExpensesFilters = useMemo(() => {
		return {
			...(weekOrderFilters?.createdAt_btwn && {
				date_btwn: weekOrderFilters.createdAt_btwn,
			}),
		};
	}, [weekOrderFilters]);

	const netProfit: number = useSum({
		path: 'orders',
		field: 'profit',
		filters: weekOrderFilters,
	});

	const expenses: number = useSum({
		path: 'expenses',
		field: 'amount',
		filters: weekExpensesFilters,
	});

	return (
		<Grid gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={2}>
			<Count title='Total Orders' path='orders' filters={weekOrderFilters} />

			<Sum
				title='Order Value'
				path='orders'
				field='total'
				filters={weekOrderFilters}
				price
			/>

			<Sum
				title='Gross Profit'
				path='orders'
				field='profit'
				filters={weekOrderFilters}
				price
			/>

			<Sum
				title='Invoice Due'
				path='orders'
				field='dueAmount'
				filters={weekOrderFilters}
				price
			/>

			<Sum
				title='Expenses'
				path='expenses'
				field='amount'
				filters={weekExpensesFilters}
				price
			/>

			<ShowSum
				tooltip='Net Profit = Gross Profit - Expenses'
				title='Net Profit'
				price
			>
				{netProfit - expenses}
			</ShowSum>
		</Grid>
	);
};

export default WeeklyOrderAnalytics;
