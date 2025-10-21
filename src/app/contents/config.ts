export const fields = [
	'name',
	'section',
	'slug',
	'category',
	'status',
	'pageName',
	'isVisible',
	'description',
	'refImage',
	//
	'image',
	'gallery',
	'content',
	'subContent',
	'url',
	'btnText',
	'richContent',
	'list',
	'card',
	// 'links',

	'priority',
	'note',
];

export const tableFields = [
	'name',
	'section',
	'slug',
	'category',
	'pageName',
	'isVisible',
	'status',
	'priority',
	'note',
];

export const formFields = [
	{
		sectionTitle: 'Content Basic',
		fields: [
			'name',
			'section',
			['slug', 'category'],
			['status', 'pageName'],
			['isVisible', 'isActive'],
			'description',
		],
	},
	{
		sectionTitle: 'Content Management (Text)',
		fields: ['content', 'subContent', ['btnText', 'url']],
	},
	{
		sectionTitle: 'Content Management (List)',
		fields: ['list'],
	},
	{
		sectionTitle: 'Content Management (Card)',
		fields: ['card'],
	},
	{
		sectionTitle: 'Content Management (Editor)',
		fields: ['richContent'],
	},
	{
		sectionTitle: 'Content Management (Image)',
		fields: ['image'],
	},
	{
		sectionTitle: 'Content Management (Gallery)',
		fields: ['gallery'],
	},
	// {
	// 	sectionTitle: 'Content Management (List of Links)',
	// 	fields: ['links'],
	// },
	{
		sectionTitle: 'Note & Ref',
		fields: ['note', 'refImage', 'priority'],
	},
];
