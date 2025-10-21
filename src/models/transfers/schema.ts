//

import { SchemaType } from '@/components/library';

type Type = {
	products?: any;
	destination: String;
	source?: String;
	reason: 'restock' | 'return' | 'relocation' | 'damage' | 'other';

	status?:
		| 'initiated'
		| 'completed'
		| 'cancelled'
		| 'pending'
		| 'approved'
		| 'failed'
		| 'rejected'
		| 'transit'
		| 'delivered'
		| 'received'
		| 'dispatched'
		| 'returned';
	type?: 'mtl' | 'ltl' | 'ltm';
	ref?: String;
	totalQty?: Number;
	createdAt?: Date;
	date?: Date;
};

const schema: SchemaType<Type> = {
	date: {
		type: 'date',
		label: 'Date',
		sort: true,
		displayInTable: true,
	},
	ref: {
		type: 'text',
		default: true,
		displayInTable: true,
		label: 'Ref.',
		sort: true,
	},
	status: {
		type: 'text',
		label: 'Status',
		sort: true,
		default: true,
		displayInTable: true,
	},
	source: {
		type: 'text',
		label: 'Source',
		tableKey: 'source.name',
		displayInTable: true,
	},
	destination: {
		type: 'text',
		label: 'Destination',
		tableKey: 'destination.name',
		displayInTable: true,
		default: true,
	},

	reason: {
		type: 'text',
		label: 'Reason',
		displayInTable: true,
		default: true,
	},

	totalQty: {
		type: 'number',
		label: 'Total Qty',
		displayInTable: true,
		default: true,
	},

	createdAt: {
		type: 'date',
		label: 'Date Added',
		sort: true,
		displayInTable: true,
	},
};

export default schema;
