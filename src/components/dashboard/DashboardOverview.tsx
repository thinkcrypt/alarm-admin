import React from 'react';
import { Count, Sum } from '@/components/library';

const DashboardOverview = () => {
	return (
		<>
			<Count
				title='Total Products'
				path='products'
			/>
			<Count
				title='Customers'
				path='customers'
			/>
			<Count
				title='Categories'
				path='categories'
			/>
			<Sum
				title='Total Assets'
				path='assets'
				field='value'
				price
			/>
			<Sum
				title='Inventory Value[Cost]'
				path='products'
				field='inventoryCostPrice'
				price
			/>
			<Sum
				title='Inventory Value[Sell]'
				path='products'
				field='inventorySellPrice'
				price
			/>
		</>
	);
};

export default DashboardOverview;
