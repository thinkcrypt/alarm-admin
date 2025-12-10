import { FormLayout } from '@/components/library';

export const fields = ['name', 'showInFilters', 'isActive', 'priority'];

export const tableFields = ['name', 'showInFilters', 'isActive', 'priority'];

export const formFields = [
	{
		sectionTitle: 'Color Information',
		fields: ['name', ['showInFilters', 'isActive'], 'priority'],
	},
];
