//

import { SchemaType } from '@/components/library';

type Type = {
	name: string;
	description?: string;
	price: number;
	image?: string;
	forcedSellPrice?: boolean;
	qty: number;
	isDeleted?: boolean;
	createdAt?: Date;
	note?: string;
	tags?: string[];
	value?: number;
};

const schema: SchemaType<Type> = {
	name: {
		type: 'text',
		isRequired: true,
		default: true,
		displayInTable: true,
		label: 'Asset Name',
		sort: true,
	},
	description: {
		type: 'textarea',
		label: 'Description',
	},
	price: {
		type: 'number',
		label: 'Price',
		displayInTable: true,
		default: true,
		isRequired: true,
		sort: true,
	},
	qty: {
		type: 'number',
		label: 'Quantity',
		displayInTable: true,
		default: true,
		sort: true,
		isRequired: true,
	},
	value: {
		type: 'number',
		label: 'Asset Value',
		displayInTable: true,
		default: true,
		sort: true,
	},
	forcedSellPrice: {
		type: 'number',
		label: 'Forced Sell Price',
		displayInTable: true,
	},
	note: {
		type: 'textarea',
		label: 'Note',
	},
	createdAt: {
		type: 'date',
		label: 'Date Added',
		sort: true,
		displayInTable: true,
	},
};

export default schema;
