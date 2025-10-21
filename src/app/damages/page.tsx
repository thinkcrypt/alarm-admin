'use client';
import React from 'react';
import { NextPage } from 'next';
import { PageTable } from '@/components/library';
import damageTable from '@/models/adjustment/adjustment.schema';

const page: NextPage = () => {
	return <PageTable table={damageTable} />;
};

export default page;
