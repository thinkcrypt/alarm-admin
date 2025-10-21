import { SchemaType } from '@/components/library';

type PaymentAccountType = {
	name: string;
	accountNumber: string;
	accountType: string;
	balance: number;
	customAttributes?: [
		{
			label: { type: String };
			value: { type: String };
		}
	];
	tags?: string[];
	isDeleted?: boolean;
	createdAt?: Date;
	note?: string;
	bankName?: string;
	branchName?: string;
};

const schema: SchemaType<PaymentAccountType> = {
	name: {
		type: 'text',
		displayInTable: true,
		label: 'Account Name',
		sort: true,
		isRequired: true,
	},
	accountNumber: {
		type: 'text',
		isRequired: true,
		displayInTable: true,
		label: 'Account Number',
		sort: true,
	},
	accountType: {
		type: 'text',
		displayInTable: true,
		label: 'Account Type',
		sort: true,
	},
	balance: {
		type: 'number',
		isRequired: true,
		displayInTable: true,
		label: 'Balance',
		sort: true,
	},
	customAttributes: {
		type: 'custom-attribute',
		label: 'Custom Attributes',
	},
	tags: {
		type: 'tag',
		label: 'Tags',
	},

	isDeleted: {
		type: 'checkbox',
		label: 'Is Deleted',
	},
	createdAt: {
		type: 'date',
		label: 'Date Created',
		sort: true,
		displayInTable: true,
	},
	note: {
		type: 'textarea',
		label: 'Note',
	},
	bankName: {
		type: 'text',
		label: 'Bank Name',
	},
	branchName: {
		type: 'text',
		label: 'Branch Name',
	},
};

export default schema;
