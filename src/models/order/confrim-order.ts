import { convertToTableFields, TableObjectProps } from '@/components/library';
import schema from './order.schema';
import itemMenu from './itemMenu';

const tableLayout: string[] = [
	'invoice',
	'customer',
	'recipient',
	'recipientPhone',
	'isNewOrder',
	'status',
	'orderDate',
	'orderTime',
	'origin',
	'totalItems',
	'vat',
	'subTotal',
	'total',
	'profit',
	'isPaid',
	'dueAmount',
	'returnAmount',
	'paidAmount',
	'coupon',
];

export const viewAllDataFields = convertToTableFields({
	schema,
	fields: tableLayout,
});

const viewAll: TableObjectProps = {
	title: 'Confrim Orders',
	path: 'confirm-orders',
	// clickable: true,
	//toPath: '/items/edit',
	export: true,
	select: {
		show: true,
		menu: [
			{
				title: 'Download Invoices',
				type: 'bulk-invoice-export',
			},
			{
				title: 'Update Order Status',
				type: 'edit-select',
				key: 'status',
				options: [
					{ label: 'Completed', value: 'completed' },
					{ label: 'Dispatched', value: 'dispatched' },
					{ label: 'Ready To Deliver', value: 'ready-to-deliver' },
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Pending', value: 'pending' },
				],
				prompt: {
					title: 'Product Status',
					body: 'Update Product Status',
				},
			},
		],
	},
	menu: itemMenu,
	data: viewAllDataFields,
};

export { viewAll as viewAll };
