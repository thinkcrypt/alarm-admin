//

import { SchemaType } from '@/components/library';

type Type = {
	message: string;
	count: number;
	sentBy?: string;
	recipient: string;
	status: 'pending' | 'sent' | 'failed';
	createdAt?: Date;
	source: 'shop' | 'inventory' | 'order' | 'customer' | 'otp';
	isDeleted?: boolean;
	rate: number;
};

const schema: SchemaType<Type> = {
	message: {
		type: 'text',
		label: 'Message',
	},
	rate: {
		type: 'number',
		label: 'Rate',
		sort: true,
		displayInTable: true,
		default: true,
	},
	count: {
		type: 'number',
		label: 'SMS Count',
		sort: true,
		displayInTable: true,
		default: true,
	},
	recipient: {
		type: 'text',
		label: 'Recipient',
		sort: true,
		displayInTable: true,
		default: true,
	},
	status: {
		type: 'text',
		label: 'Status',
		sort: true,
		displayInTable: true,
		default: true,
	},
	createdAt: {
		type: 'date',
		label: 'Date',
		sort: true,
		displayInTable: true,
		default: true,
	},

	source: {
		type: 'text',
		label: 'Source',
		sort: true,
		displayInTable: true,
	},
};

export default schema;
