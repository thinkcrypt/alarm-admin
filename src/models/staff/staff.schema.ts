//

import { SchemaType } from '@/components/library';

type Type = {
	name: string;
	email: string;
	phone: string;
	role?: string;
	location: string;
	isActive?: boolean;
	password: string;
	createdAt: Date;
};

const schema: SchemaType<Type> = {
	name: {
		type: 'text',
		isRequired: true,
		default: true,
		displayInTable: true,
		label: 'Full Name',
		sort: true,
	},
	email: {
		type: 'text',
		label: 'Email',
		displayInTable: true,
		default: true,
		isRequired: true,
	},

	phone: {
		type: 'text',
		label: 'Phone Number',
		displayInTable: true,
		default: true,
		isRequired: true,
	},
	location: {
		type: 'data-menu',
		tableKey: 'location.name',
		tableType: 'text',
		label: 'Location',
		displayInTable: true,
		default: true,
		isRequired: true,
		model: 'locations',
	},
	password: {
		type: 'password',
		label: 'Password',
		isRequired: true,
	},

	createdAt: {
		type: 'date',
		label: 'Date Added',
		sort: true,
		displayInTable: true,
	},
};

export default schema;
