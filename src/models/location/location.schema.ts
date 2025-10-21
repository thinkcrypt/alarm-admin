//

import { SchemaType } from '@/components/library';

type Type = {
	name: string;
	shortDescription?: string;
	description?: string;
	isActive?: boolean;
	image?: string;
	address?: string;
	tags?: string[];
	phone?: string;
	email?: string;
	createdAt: Date;
};

const schema: SchemaType<Type> = {
	name: {
		type: 'text',
		isRequired: true,
		default: true,
		displayInTable: true,
		label: 'Location Name',
		sort: true,
	},
	description: {
		type: 'textarea',
		label: 'Description',
	},
	address: {
		type: 'textarea',
		label: 'Full Address',
	},

	phone: {
		type: 'text',
		label: 'Phone Number',
		displayInTable: true,
		default: true,
	},
	email: {
		type: 'text',
		label: 'Phone Number',
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
