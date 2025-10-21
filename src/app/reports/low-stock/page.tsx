'use client';

import React from 'react';
import { NextPage } from 'next';
import {
	PageTable,
	TableObjectProps,
	convertToTableFields,
	convertToViewFields,
} from '@/components/library';
import schema from '@/models/products/product.schema';

const fields = ['name', 'stock', 'lowStockAlert', 'cost', 'price', 'category', 'brand'];

const viewAllDataFields = convertToTableFields({
	schema,
	fields,
});
const viewAll: TableObjectProps = {
	title: 'Products',
	path: 'products/low-stock',
	hidePreferences: true,
	preferences: fields,
	menu: [
		{
			title: 'View',
			type: 'view-modal',
			dataModel: convertToViewFields({ schema }),
			path: 'products',
			id: (data: any) => {
				return data._id;
			},
		},
	],
	data: viewAllDataFields,
};

const page: NextPage = () => {
	return <PageTable table={viewAll} />;
};

export default page;
