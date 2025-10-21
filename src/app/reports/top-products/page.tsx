'use client';

import React from 'react';
import { NextPage } from 'next';
import { PageTable, TableObjectProps } from '@/components/library';

const viewAll: TableObjectProps = {
	title: 'Top Selling Products',
	path: 'products/top-selling',
	clickable: true,
	toPath: '/view/products',
	export: false,
	search: false,
	preferences: ['name', 'sku', 'category', 'price', 'totalQuantity'],
	hidePreferences: true,

	data: [
		{
			dataKey: 'name',
			title: 'Product Name',
		},
		{
			dataKey: 'sku',
			title: 'SKU',
		},
		{
			dataKey: 'category',
			title: 'Category',
		},
		{
			dataKey: 'totalQuantity',
			title: 'Sold',
		},
	],
	showMenu: false,
};

const page: NextPage = () => {
	return <PageTable table={viewAll} />;
};

export default page;
