const formFields = {
	date: {
		name: 'date',
		label: 'Transfer Date',
		type: 'date',
		isRequired: true,
	},
	ref: {
		name: 'ref',
		label: 'Reference Number',
		type: 'text',

		helper: 'Leave it empty to auto-generate',
	},

	status: {
		name: 'status',
		label: 'Status',
		type: 'select',
		options: [
			{ label: 'Initiated', value: 'initiated' },
			{ label: 'Completed', value: 'completed' },
			{ label: 'Cancelled', value: 'cancelled' },
			{ label: 'Pending', value: 'pending' },
			{ label: 'Approved', value: 'approved' },
			{ label: 'Failed', value: 'failed' },
			{ label: 'Rejected', value: 'rejected' },
			{ label: 'Transit', value: 'transit' },
			{ label: 'Delivered', value: 'delivered' },
			{ label: 'Received', value: 'received' },
			{ label: 'Dispatched', value: 'dispatched' },
			{ label: 'Returned', value: 'returned' },
		],
	},
	reason: {
		name: 'reason',
		label: 'Reason',
		type: 'select',
		options: [
			{ label: 'Restock', value: 'restock' },
			{ label: 'Return', value: 'return' },
			{ label: 'Relocation', value: 'relocation' },
			{ label: 'Damage', value: 'damage' },
			{ label: 'Other', value: 'other' },
		],
	},
	source: {
		name: 'source',
		label: 'Source',
		model: 'locations',
		type: 'data-menu',
		helper: 'Leave it empty if transfer is from the main warehouse',
	},
	location: {
		name: 'location',
		label: 'Destination',
		isRequired: true,
		model: 'locations',
		type: 'data-menu',
	},
};

export default formFields;
