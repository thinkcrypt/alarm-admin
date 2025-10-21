'use client';

import React from 'react';
import { NextPage } from 'next';
import { PageTable } from '@/components/library';
import { getAll } from '@/models/categories';

const CatPage: NextPage = () => {
	return <PageTable table={getAll} />;
};

export default CatPage;
