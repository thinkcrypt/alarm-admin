'use client';

import React from 'react';
import { NextPage } from 'next';
import {
	convertToFormFields,
	convertToTableFields,
	extendSchema,
	PageTable,
	TableObjectProps,
} from '@/components/library';

import schema from '@/models/order/order.schema';
import refundSchema from '@/models/expenses/refund.schema';

//import table from '@/models/products/viewAllProductModel';
const extendedSchema = extendSchema({
	schema,
	fields: {
		dueAmount: {
			label: 'Refund Amount',
			type: 'number',
			displayInTable: true,
			default: true,
		},
		createdAt: {
			label: 'Order Date',
			type: 'date',
			displayInTable: true,
			default: true,
		},
	},
});

const tableFields = convertToTableFields({
	schema: extendedSchema,
	fields: ['invoice', 'dueAmount', 'customer', 'createdAt'],
});

const formField = convertToFormFields({
	schema: refundSchema,
	layout: [
		{
			sectionTitle: 'Payment details',
			fields: [
				'invoice',
				'due',
				['account', 'status'],
				['amount', 'paymentMethod'],
				'date',

				['trnxId', 'reference'],
			],
		},

		{
			sectionTitle: 'Additional Information',
			fields: ['tags', 'note', 'attachments'],
		},
	],
});

const table: TableObjectProps = {
	title: 'Pending Refunds',
	data: tableFields,
	path: 'orders',
	hidePreferences: true,
	search: false,
	export: true,
	preFilters: {
		dueAmount_lt: 0,
	},
	menu: [
		{
			title: 'Refund',
			type: 'post',
			dataModel: formField,
			path: 'payments',
			invalidate: ['orders', 'payment', 'order', 'payments'],
		},
	],
	filters: false,
};

const page: NextPage = () => {
	return (
		<PageTable
			table={table}
			layoutPath='pending-refunds'
		/>
	);
};

export default page;
