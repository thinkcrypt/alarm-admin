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
import { staffSchema as schema } from '@/models';

const form = convertToFormFields({
	schema,
	layout: [
		{
			sectionTitle: 'Basic Info',
			fields: ['name', ['phone', 'email'], 'password', 'location'],
		},
	],
});

const viewModel = convertToViewFields({
	schema,
	fields: ['name', 'location', 'phone', 'email', 'createdAt'],
});

const table: TableObjectProps = {
	title: 'Locations',
	data: convertToTableFields({
		schema,
		fields: ['name', 'location', 'phone', 'email', 'createdAt'],
	}),
	path: 'staffs',
	button: {
		title: 'Add Staff',
		isModal: true,
		dataModel: form,
		prompt: {
			title: 'Add New Staff Member',
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
