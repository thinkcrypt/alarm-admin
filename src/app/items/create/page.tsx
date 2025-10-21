'use client';

import React from 'react';
import { table } from './dataModel';
import { AddItemPage } from '@/components/library';

const CreateItemsPage = () => {
	return <AddItemPage data={table} />;

	// return (
	// 	<FormPage
	// 		data={fields}
	// 		formData={formData}
	// 		setFormData={setFormData}
	// 		trigger={trigger}
	// 		result={result}
	// 		path='items'
	// 		title='Create Item'
	// 	/>
	// );
};

export default CreateItemsPage;
