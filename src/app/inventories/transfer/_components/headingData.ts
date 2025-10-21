export type HeadingProps = {
	content: string;
	isNumeric?: boolean;
};

const HEADINGS: HeadingProps[] = [
	{
		content: '#',
	},
	{
		content: 'Product Name',
	},
	{
		content: 'Qty',
	},
	{
		content: 'Unit Cost Price',
	},
	{
		content: 'SubTotal',
		isNumeric: true,
	},
	{
		content: 'delete',
	},
];

export default HEADINGS;
