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
import { paymentAccountSchema as schema } from '@/models';

const form = convertToFormFields({
	schema,
	layout: [
		{
			sectionTitle: 'Basic Info',
			fields: ['name', 'accountNumber', ['accountType', 'balance']],
		},
		{
			sectionTitle: 'Bank Info (If account is a bank account)',
			fields: [['bankName', 'branchName']],
		},
		{
			sectionTitle: 'Additional Details',
			fields: ['tags', 'customAttributes', 'note'],
		},
	],
});

const viewModel = convertToViewFields({
	schema,
	fields: [
		'name',
		'accountNumber',
		'balance',
		'accountType',
		'bankName',
		'branchName',
		'createdAt',
		'tags',
		'customAttributes',
		'note',
		'createdAt',
	],
});

const table: TableObjectProps = {
	title: 'Payment Account',
	data: convertToTableFields({
		schema,
		fields: ['name', 'accountNumber', 'balance', 'accountType', 'createdAt'],
	}),
	path: 'payment-accounts',
	button: {
		title: 'Add Account',
		isModal: true,
		dataModel: form,
		prompt: {
			title: 'Add Payment Account',
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
