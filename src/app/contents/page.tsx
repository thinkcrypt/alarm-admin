'use client';
import React from 'react';
import { NextPage } from 'next';
import { BackendPageTable, BackendTableObjectProps } from '@/components/library';

import { formFields, tableFields, fields } from './config';

const contentsTable: BackendTableObjectProps = {
	title: 'Contents',
	path: 'contents',

	button: {
		title: 'Add Content',
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

const BannersPage: NextPage = () => {
	return <BackendPageTable table={contentsTable} />;
};

export default BannersPage;
