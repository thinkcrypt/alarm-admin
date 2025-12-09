'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	convertToTableFields,
	convertToViewFields,
	PageTable,
	TableObjectProps,
} from '@/components/library';
import { viewAll as table } from '@/models/order/confrim-order';

const page: NextPage = () => {
	return <PageTable table={table} />;
};

export default page;
