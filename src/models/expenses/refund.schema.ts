import { Schema } from '@/components/library';

const refundSchema: Schema = {
	invoice: {
		label: 'Order Id',
		type: 'read-only',
		tableType: 'text',
		sort: true,
		default: true,
		displayInTable: true,
		getValue: (data: any) => data?._id,
	},

	due: {
		label: 'Refund Due',
		type: 'read-only',
		isRequired: true,
		getValue: (data: any) => data?.dueAmount * -1,
		isExcluded: true,
	},
	amount: {
		label: 'Amount',
		type: 'number',
		sort: true,
		default: true,
		displayInTable: true,
		isRequired: true,
		getValue: (data: any) => data?.dueAmount * -1,
	},
	date: {
		label: 'Date',
		type: 'date',
		sort: true,
		default: true,
		displayInTable: true,
		isRequired: true,
	},
	tags: {
		label: 'tags',
		isRequired: false,
		type: 'tag',
	},
	account: {
		label: 'Account',
		type: 'read-only',
		tableType: 'text',
		value: 'debit',
		default: true,
		displayInTable: true,
		isRequired: true,
	},
	status: {
		label: 'Status',
		type: 'read-only',
		value: 'refunded',
		isRequired: true,
	},

	note: {
		label: 'Note',
		type: 'textarea',
	},
	customer: {
		label: 'Customer',
		type: 'data-menu',
		menuField: 'invoice',
		tableType: 'text',
		model: 'customers',
		displayInTable: true,
		tableKey: 'customer.name',
		default: true,
	},
	trnxId: {
		label: 'Transaction ID',
		type: 'text',
		displayInTable: true,
		default: true,
	},
	reference: {
		label: 'Ref',
		type: 'text',
		displayInTable: true,
		default: true,
	},
	paymentMethod: {
		label: 'Payment Method',
		type: 'select',
		options: [
			{ label: 'Cash', value: 'cash' },
			{ label: 'Cheque', value: 'cheque' },
			{ label: 'Card', value: 'card' },
			{ label: 'Bank', value: 'bank' },
			{ label: 'Bkash', value: 'bkash' },
			{ label: 'Nagad', value: 'nagad' },
			{ label: 'Rocket', value: 'rocket' },
			{ label: 'Other', value: 'other' },
			{ label: 'SSL', value: 'ssl' },
			{ label: 'Stripe', value: 'stripe' },
		],
		default: true,
		displayInTable: true,
		isRequired: true,
	},
	createdAt: {
		label: 'Created At',
		type: 'date',
		sort: true,
		default: true,
		displayInTable: true,
	},
};

export default refundSchema;
