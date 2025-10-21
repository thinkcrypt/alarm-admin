import { ViewModalDataModelProps } from '@/components/library';

const data: ViewModalDataModelProps[] = [
	{
		title: 'Image',
		dataKey: 'image',
		type: 'image',
	},
	{
		title: 'Name',
		dataKey: 'name',
		type: 'string',
	},
	{ title: 'Category', dataKey: 'category.name', type: 'string' },
	{
		title: 'Price',
		dataKey: 'price',
		type: 'string',
	},
	{
		title: 'Is Discount?',
		dataKey: 'isDiscount',
		type: 'tag',
		colorScheme: (data: boolean) => (data ? 'green' : 'red'),
	},
	{
		title: 'After Discount',
		dataKey: 'discountPrice',
		type: 'string',
	},
	{
		title: 'Description',
		dataKey: 'description',
		type: 'string',
	},
	{
		title: 'Custom Sections',
		dataKey: 'customSections',
		type: 'custom-section-array',
	},

	{
		title: 'Images',
		dataKey: 'images',
		type: 'image-array',
	},

	{
		title: 'Collections',
		dataKey: 'collection',
		type: 'data-array-tag',
		path: 'collections',
	},
	{
		title: 'Active',
		dataKey: 'isActive',
		type: 'tag',
		colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
	},
	{
		title: 'Created',
		dataKey: 'createdAt',
		type: 'date',
	},
];

export default data;
