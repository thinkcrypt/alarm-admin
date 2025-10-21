'use client';
import React from 'react';
import { NextPage } from 'next';
import supplierSchema from '@/models/supplier/supplier.schema';
import {
	PageTable,
	TableObjectProps,
	convertToFormFields,
	convertToTableFields,
	convertToViewFields,
} from '@/components/library';

const layout = convertToTableFields({
	schema: supplierSchema,
	fields: ['name', 'email', 'phone', 'payable', 'receivable', 'createdAt'],
});
const viewFields = convertToViewFields({ schema: supplierSchema });
const formFields = convertToFormFields({
	schema: supplierSchema,
	layout: [
		{
			sectionTitle: 'Basic Information',
			fields: ['name', ['email', 'phone'], 'address'],
		},
		{
			sectionTitle: 'Opening Balance',
			fields: ['payable', 'receivable'],
		},
	],
});

const editFields = convertToFormFields({
	schema: supplierSchema,
	layout: [
		{
			sectionTitle: 'Basic Information',
			fields: ['name', ['email', 'phone'], 'address'],
		},
	],
});

const table: TableObjectProps = {
	title: 'Suppliers',
	path: 'suppliers',
	clickable: true,
	toPath: '/view/suppliers',
	data: layout,
	isModal: true,
	button: {
		title: 'Add Supplier',
	},
	createModel: formFields,
	menu: [
		{
			type: 'view-modal',
			title: 'View',
			dataModel: viewFields,
		},
		{
			type: 'edit-modal',
			title: 'Update',
			dataModel: editFields,
		},
	],
};

const page: NextPage = () => {
	return <PageTable table={table} />;
};

export default page;
