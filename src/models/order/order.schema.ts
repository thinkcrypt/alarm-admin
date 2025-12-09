//

export const orderStatus = [
	{
		label: 'Pending',
		value: 'pending',
	},
	{
		label: 'Order Placed',
		value: 'order-placed',
	},
	{
		label: 'Processing',
		value: 'processing',
	},
	{
		label: 'Ready For Dispatch',
		value: 'ready-for-dispatch',
	},
	{
		label: 'Dispatched',
		value: 'dispatched',
	},
	{
		label: 'Completed',
		value: 'completed',
	},
	{
		label: 'Refunded',
		value: 'refunded',
	},
	{
		label: 'Cancelled',
		value: 'cancelled',
	},
];

const schema = {
	invoice: {
		label: 'Invoice',
		type: 'string',
		displayInTable: true,
		default: true,
		sort: true,
	},
	total: {
		label: 'Total Price',
		type: 'number',
		displayInTable: true,
	},
	profit: {
		label: 'Profit',
		type: 'number',
		displayInTable: true,
	},
	vat: {
		label: 'VAT',
		type: 'number',
		displayInTable: true,
	},
	subTotal: {
		label: 'Sub Total',
		type: 'number',
		default: true,
		displayInTable: true,
	},
	paidAmount: {
		label: 'Paid Amount',
		type: 'number',
		displayInTable: true,
	},
	orderDate: {
		label: 'Order Date',
		type: 'date-only',
		displayInTable: true,
		default: true,
		sort: true,
		tableKey: 'orderDate',
	},
	orderTime: {
		label: 'Order Time',
		type: 'time',
		displayInTable: true,
		default: true,
		sort: true,
		tableKey: 'createdAt',
	},
	returnAmount: {
		label: 'Return Amount',
		type: 'number',
		displayInTable: true,
		default: true,
	},
	dueAmount: {
		label: 'Due Amount',
		type: 'number',
		displayInTable: true,
	},
	isPaid: {
		label: 'Is Paid',
		type: 'checkbox',
		displayInTable: true,
		colorScheme: (isPaid: boolean) => (isPaid ? 'green' : 'red'),
	},
	coupon: {
		label: 'Coupon',
		type: 'string',
		displayInTable: true,
	},
	origin: {
		label: 'Order From',
		type: 'string',
		displayInTable: true,
	},
	address: {
		label: 'Address',
		type: 'object',
	},
	items: {
		label: 'Items',
		type: 'array',
		displayInTable: true,
	},
	totalItems: {
		label: 'Total Items',
		type: 'number',
		displayInTable: true,
		default: true,
	},
	status: {
		label: 'Order Status',
		type: 'tag',
		colorScheme: (status: string) => {
			if (status === 'pending') return 'yellow';
			if (status === 'completed') return 'green';
			if (status === 'cancelled') return 'red';
			if (status === 'order-placed') return 'blue';
			if (status === 'ready-for-dispatch') return 'cyan';
			if (status === 'dispatched') return 'teal';
			if (status === 'refunded') return 'orange';
			return 'purple';
		},
		displayInTable: true,
		default: true,
	},

	isNewOrder: {
		type: 'tag',
		label: 'New Orders',
		colorScheme: (isNewOrder: any) => {
			return isNewOrder ? 'blue' : 'purple';
		},
		sort: true,
		displayInTable: true,
		default: true,
	},

	customer: {
		label: 'Customer',
		type: 'text',
		displayInTable: true,
		default: true,
		tableKey: 'customer.name',
	},
	recipient: {
		label: 'Recipient',
		type: 'text',
		displayInTable: true,
		default: true,
		tableKey: 'address.name',
	},
	recipientPhone: {
		label: 'Recipient Phone',
		type: 'text',
		displayInTable: true,
		default: true,
		tableKey: 'address.phone',
	},
	location: {
		label: 'Location',
		type: 'text',
		displayInTable: true,
		default: true,
		tableKey: 'location.name',
	},
};

export default schema;
