'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	convertToTableFields,
	convertToViewFields,
	PageTable,
	TableObjectProps,
} from '@/components/library';
import schema from '@/models/sms/sms.schema';

const table: TableObjectProps = {
	title: 'SMS Log',
	data: convertToTableFields({
		schema,
		fields: ['recipient', 'count', 'rate', 'createdAt', 'status'],
	}),
	path: 'sms',
	menu: [
		{
			title: 'View',
			type: 'view-modal',
			dataModel: convertToViewFields({ schema }),
		},
	],
};

const page: NextPage = () => {
	return <PageTable table={table} />;
};

export default page;
