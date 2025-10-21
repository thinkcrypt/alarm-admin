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

const LedgerPage: NextPage = () => {
	const viewFields = convertToTableFields({
		schema,
		fields: ['customer', 'amount', 'amountReceived', 'amountSent', 'account', 'date', 'note'],
	});

	const ledgerTable: TableObjectProps = {
		title: 'Customer Ledgers',
		path: 'ledgers',
		preFilters: { type: 'customer' },
		filters: false,
		data: viewFields,
		menu: [{ type: 'view-modal', title: 'View', dataModel: viewDataFields }],
	};
	return <PageTable table={ledgerTable} />;
};

export default LedgerPage;
