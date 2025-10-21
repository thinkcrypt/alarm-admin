import React from 'react';
import { ShowSum } from '@/components/library';
import { useGetSelfQuery } from '@/store/services/authApi';

const MarketingAnalytics = () => {
	const { data } = useGetSelfQuery({});
	return (
		<>
			<ShowSum
				tooltip='Amount spent on SMS'
				title='SMS Expenses'
				isLoading={!data}>
				{data?.shop?.smsExpense?.toFixed(2)}
			</ShowSum>
			<ShowSum
				tooltip='SMS Balance'
				title='SMS Balance'
				isLoading={!data}>
				{data?.shop?.smsBalance?.toFixed(2)}
			</ShowSum>
		</>
	);
};

export default MarketingAnalytics;
