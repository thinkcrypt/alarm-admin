'use client';
import React from 'react';
import { NextPage } from 'next';
import { PageTable } from '@/components/library';
import expenseTable from '@/models/expenses/expense.model';
import deliveryTable from '@/models/delivery/delivery.schema';

const page: NextPage = () => {
	return <PageTable table={deliveryTable} />;
};

export default page;
