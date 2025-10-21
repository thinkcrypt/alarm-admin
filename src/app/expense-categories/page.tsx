'use client';
import React from 'react';
import { NextPage } from 'next';
import { PageTable } from '@/components/library';
import expenseCategoryTable from '@/models/expenses/expenseCategory.model';

const page: NextPage = () => {
	return <PageTable table={expenseCategoryTable} />;
};

export default page;
