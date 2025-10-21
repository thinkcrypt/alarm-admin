import { InputData } from '@/components/library';
import createCategoryModalModel from '@/lib/dataModels/createCategory.model';

export type DataType = {
	name: string | undefined;
	isFeatured: boolean;
	image?: string | undefined;
	meta?: {
		title: string;
		description: string;
	};
	[key: string]: any;
};

const dataFields: InputData<DataType>[] = [
	{
		sectionTitle: 'Product Image',
		name: 'image',
		label: 'Image',
		isRequired: false,
		type: 'image',
	},
	{
		name: 'name',
		label: 'Item Name',
		isRequired: true,
		type: 'text',
		endOfSection: true,
	},
	{
		sectionTitle: 'Product Images',
		name: 'images',
		label: 'Images',
		isRequired: false,
		type: 'image-array',
		endOfSection: true,
	},

	{
		sectionTitle: 'Product Information',
		name: 'price',
		label: 'Price',
		isRequired: false,
		type: 'number',
	},
	{
		name: 'time',
		label: 'Cooking Time',
		isRequired: false,
		type: 'number',
	},
	{
		name: 'category',
		label: 'Product Category',
		isRequired: true,
		type: 'data-menu',
		span: 1,
		model: 'categories',
		dataModel: createCategoryModalModel,
	},
	{
		name: 'description',
		label: 'Short Description',
		isRequired: false,
		type: 'textarea',
	},
	{
		name: 'longDescription',
		label: 'Description',
		isRequired: false,
		type: 'textarea',
		endOfSection: true,
	},
	{
		sectionTitle: 'Product Collections',
		name: 'collection',
		label: 'Add to collections',
		isRequired: false,
		type: 'data-tag',
		model: 'collections',
	},
	{
		name: 'tags',
		label: 'Add Tags',
		isRequired: false,
		type: 'tag',
		endOfSection: true,
	},
	{
		sectionTitle: 'Custom Attributes',
		name: 'customAttributes',
		label: 'Add Custom Attributes',
		isRequired: false,
		type: 'custom-attribute',
	},
	{
		label: 'Custom Sections',
		name: 'customSections',
		type: 'custom-section-array',
		isRequired: false,
		endOfSection: true,
	},
	{
		label: 'Frequently Asked Questions',
		name: 'faq',
		type: 'custom-section-array',
		isRequired: false,
		endOfSection: true,
	},
];

export const table = {
	type: 'add',
	title: 'Add New Item',
	path: 'items',
	fields: dataFields,
};

export default dataFields;
