'use client';
import React from 'react';
import { NextPage } from 'next';
import { PageTable } from '@/components/library';
import expenseTable from '@/models/expenses/expense.model';

const page: NextPage = () => {
	return <PageTable table={expenseTable} />;
};

export default page;
