'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	convertToTableFields,
	convertToViewFields,
	PageTable,
	TableObjectProps,
	ListTransferModal,
} from '@/components/library';
import { transferSchema as schema } from '@/models';

const viewModel = convertToViewFields({
	schema,
	fields: [
		'destination',
		'soruce',
		'status',
		'reason',
		'type',
		'ref',
		'totalQty',
		'date',
		'createdAt',
	],
});

const table: TableObjectProps = {
	title: 'Transfers',

	data: convertToTableFields({
		schema,
		fields: [
			'destination',
			'soruce',
			'status',
			'reason',
			'type',
			'ref',
			'totalQty',
			'date',
			'createdAt',
		],
	}),
	path: 'transfers',
	button: {
		title: 'Add Transfer',
		path: '/inventories/transfer',
	},
	menu: [
		{
			title: 'View',
			type: 'view-modal',
			dataModel: viewModel,
		},
		{
			title: 'List Products',
			type: 'custom',
			modal: ListTransferModal,
		},
	],
};

const page: NextPage = () => {
	return <PageTable table={table} />;
};

export default page;
