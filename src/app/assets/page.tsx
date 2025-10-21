'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	convertToFormFields,
	convertToTableFields,
	convertToViewFields,
	PageTable,
	TableObjectProps,
} from '@/components/library';
import { assetSchema as schema } from '@/models';

const form = convertToFormFields({
	schema,
	layout: [
		{
			sectionTitle: 'Basic Info',
			fields: ['name', 'price', 'qty', 'forcedSellPrice'],
		},
		{
			sectionTitle: 'description',
			fields: ['description', 'note'],
		},
	],
});

const viewModel = convertToViewFields({
	schema,
	fields: ['name', 'description', 'price', 'qty', 'value', 'forcedSellPrice', 'note', 'createdAt'],
});

const table: TableObjectProps = {
	title: 'Assets',
	data: convertToTableFields({
		schema,
		fields: ['name', 'price', 'qty', 'value', 'forcedSellPrice', 'createdAt'],
	}),
	path: 'assets',
	button: {
		title: 'Add Asset',
		isModal: true,
		dataModel: form,
		prompt: {
			title: 'Add New Asset',
		},
	},
	menu: [
		{
			title: 'View',
			type: 'view-modal',
			dataModel: viewModel,
		},
		{
			title: 'Edit',
			type: 'edit-modal',
			dataModel: form,
		},
	],
};

const page: NextPage = () => {
	return <PageTable table={table} />;
};

export default page;
