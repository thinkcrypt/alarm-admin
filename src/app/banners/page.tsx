'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	FormLayout,
	BackendPageTable,
	BackendTableObjectProps,
} from '@/components/library';

import { formFields, tableFields, fields } from './config';

const emailSubscriptionTable: BackendTableObjectProps = {
	title: 'Banners',
	path: 'banners',

	button: {
		title: 'Add Banner',
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

const EmailSubscriptionPage: NextPage = () => {
	return <BackendPageTable table={emailSubscriptionTable} />;
};

export default EmailSubscriptionPage;
