import { Schema } from '@/components/library';

const schema: Schema = {
	invoice: {
		type: 'string',
		label: 'Invoice',
		displayInTable: true,
		default: true,
		sort: true,
	},
	supplier: {
		type: 'string',
		label: 'Supplier',
		tableKey: 'supplier.name',
		displayInTable: true,
		default: true,
	},

	date: {
		type: 'date',
		label: 'Date',
		displayInTable: true,
		default: true,
	},
	addedBy: {
		type: 'string',
		tableKey: 'addedBy.name',
		label: 'Added By',
		displayInTable: true,
	},
	totalItems: {
		label: 'Total Price',
		type: 'number',
		displayInTable: true,
	},
	subTotal: {
		type: 'number',
		label: 'Sub Total',
		displayInTable: true,
	},
	shippingCost: {
		type: 'number',
		label: 'Shipping',
		displayInTable: true,
	},
	total: {
		type: 'number',
		label: 'Total',
		displayInTable: true,
		default: true,
	},
	discount: {
		type: 'number',
		label: 'Discount',
		displayInTable: true,
	},
	paidAmount: {
		type: 'number',
		label: 'Paid amount',
		displayInTable: true,
	},
	returnedAmount: {
		type: 'number',
		label: 'Returned Amount',
		displayInTable: true,
	},
	dueAmount: {
		type: 'number',
		label: 'Due',
		displayInTable: true,
		default: true,
	},
	status: {
		type: 'string',
		label: 'Status',
		displayInTable: true,
	},

	isCancelled: {
		type: 'tag',
		label: 'Cancelled',
		displayInTable: true,
	},
	note: {
		type: 'textarea',
		label: 'Note',
	},

	isDelivered: {
		type: 'tag',
		label: 'Delivered',
		displayInTable: true,
		colorScheme: (data: any) => (data?.isDelivered ? 'green' : 'red'),
	},
};

export default schema;
