'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	FormLayout,
	BackendPageTable,
	BackendTableObjectProps,
} from '@/components/library';
import { fields, formFields, tableFields } from './config';

const colorsTable: BackendTableObjectProps = {
	title: 'Colors',
	path: 'colors',
	button: {
		title: 'Add Color',
		isModal: true,
		layout: formFields,
	},
	fields: tableFields,
	menu: [
		{
			type: 'edit-modal',
			title: 'Edit',
			layout: formFields,
		},

		{
			type: 'view-modal',
			title: 'Quick View',
			fields: fields,
		},
		// {
		// 	type: 'view-item',
		// 	title: 'View Detials',
		// 	fields: fields,
		// },
		{
			type: 'delete',
			title: 'Delete',
		},
	],
};

const ColorPage: NextPage = () => {
	return <BackendPageTable table={colorsTable} />;
};

export default ColorPage;
