'use client';

import React from 'react';
import { NextPage } from 'next';
import { PageTable, TableObjectProps } from '@/components/library';

const viewAll: TableObjectProps = {
	title: 'Report: Top Customers',
	path: 'customers/analytics/top-buying',
	clickable: true,
	toPath: '/view/products',
	export: false,
	search: false,
	preferences: ['name', 'totalOrders', 'totalOrderValue', 'totalProductsBought'],
	hidePreferences: true,

	data: [
		{
			dataKey: 'name',
			title: 'Customer Name',
		},
		{
			dataKey: 'totalOrders',
			title: 'Orders',
		},
		{
			title: 'Products Bought',
			dataKey: 'totalProductsBought',
		},
		{
			title: 'Order Value',
			dataKey: 'totalOrderValue',
			type: 'number',
		},
	],
	showMenu: false,
};

const page: NextPage = () => {
	return <PageTable table={viewAll} />;
};

export default page;
