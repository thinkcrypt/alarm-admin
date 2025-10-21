'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	PageTable,
	convertToViewFields,
	convertToTableFields,
	TableObjectProps,
	Schema,
} from '@/components/library';
import InventoryItems from './_components/InventoryItems';

const schema: Schema = {
	name: {
		label: 'Product Name',
		type: 'string',
		sort: true,
		default: true,
		displayInTable: true,
		isRequired: true,
	},
	type: {
		label: 'Type',
		type: 'string',

		default: true,
		displayInTable: true,
	},
	category: {
		label: 'Category',
		type: 'string',
		sort: true,
		default: true,
		displayInTable: true,
	},
	stock: {
		label: 'Stock',
		type: 'number',

		default: true,
		displayInTable: true,
	},
	sku: {
		label: 'Sku',
		type: 'string',
		sort: true,
		default: true,
		displayInTable: true,
	},
	size: {
		label: 'Size',
		type: 'string',
		default: true,
		displayInTable: true,
	},
	color: {
		label: 'Size',
		type: 'string',
		default: true,
		displayInTable: true,
	},
	cost: {
		label: 'Cost',
		type: 'number',

		displayInTable: true,
	},
	price: {
		label: 'Price',
		type: 'number',
		sort: true,
		default: true,
		displayInTable: true,
	},
};

const viewDataFields = convertToViewFields({ schema });

const LedgerPage: NextPage = () => {
	const viewFields = convertToTableFields({
		schema,
		fields: ['name', 'type', 'category', 'stock', 'sku', 'size', 'color', 'cost', 'price'],
	});

	const ledgerTable: TableObjectProps = {
		title: 'Inventory',
		path: 'inventory',
		filters: false,
		data: viewFields,
		menu: [],
	};
	return (
		<PageTable table={ledgerTable}>
			<InventoryItems />
		</PageTable>
	);
};

export default LedgerPage;
