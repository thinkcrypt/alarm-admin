'use client';

import React from 'react';
import { useFormData, EditItemPage } from '@/components/library';
import { useParams } from 'next/navigation';
import {
	useGetByIdQuery,
	useUpdateByIdMutation,
} from '@/components/library/store/services/commonApi';
import { table } from '../../create/dataModel';

const inputFields: any = [
	{
		sectionTitle: 'Product Image',
		name: 'image',
		label: 'Image',
		isRequired: false,
		type: 'image',
		endOfSection: true,
	},
	{
		name: 'name',
		label: 'Name',
		isRequired: true,
		type: 'text',
	},
	{
		label: 'Item Price',
		name: 'price',
		isRequired: true,
		type: 'number',
	},
	{
		name: 'time',
		label: 'Cooking Time',
		isRequired: false,
		type: 'number',
	},
	{
		name: 'description',
		label: 'Short Description',
		isRequired: false,
		type: 'textarea',
	},
	{
		name: 'longDescription',
		label: 'Long Description',
		isRequired: false,
		type: 'textarea',
	},
	{
		name: 'category',
		label: 'Item Category',
		isRequired: true,
		type: 'data-select',
		model: 'categories',
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
	},
];

const UpdateItemPage = () => {
	return (
		<>
			<EditItemPage data={table} />
			{/* <FormPage
				data={inputFields}
				formData={formData}
				setFormData={setFormData}
				trigger={trigger}
				result={result}
				path='items'
				title='Update Menu Item'
				type='update'
				id={id}
			/> */}
		</>
	);
};

export default UpdateItemPage;
