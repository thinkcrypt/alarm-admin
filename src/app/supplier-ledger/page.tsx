'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	PageTable,
	convertToViewFields,
	convertToTableFields,
	TableObjectProps,
} from '@/components/library';
import schema from '@/models/ledger/ledger.schema';

const viewDataFields = convertToViewFields({ schema });

const viewFields = convertToTableFields({
	schema,
	fields: ['supplier', 'amount', 'amountReceived', 'amountSent', 'account', 'date', 'note'],
});

const ledgerTable: TableObjectProps = {
	title: 'Supplier Ledgers',
	path: 'ledgers',
	preFilters: { type: 'supplier' },
	filters: false,
	data: viewFields,
	menu: [{ type: 'view-modal', title: 'View', dataModel: viewDataFields }],
};

const LedgerPage: NextPage = () => {
	return <PageTable table={ledgerTable} />;
};

export default LedgerPage;
