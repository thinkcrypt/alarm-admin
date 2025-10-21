'use client';

import React from 'react';
import { NextPage } from 'next';
import { TableObjectProps, PageTable } from '@/components/library';
import viewDataModel from './viewDataModel';
import createCategoryModalModel from '@/lib/dataModels/createCategory.model';
import createCollection from '@/models/collection/createCollection.model';

const data: TableObjectProps = {
	title: 'Items',
	path: 'items',
	// clickable: true,
	//toPath: '/items/edit',
	export: true,
	select: {
		show: true,
		menu: [
			{
				title: 'Mark as Active',
				type: 'edit',
				key: 'isActive',
				value: true,
				prompt: {
					title: 'Mark as Active',
					body: 'Are you sure you want to mark these items as active?',
				},
			},
			{
				title: 'Mark as Inactive',
				type: 'edit',
				key: 'isActive',
				value: false,
				prompt: {
					title: 'Mark as InActive',
					body: 'Are you sure you want to mark these items as in-active?',
				},
			},
			{
				title: 'Update Active Status',
				type: 'edit-select',
				key: 'isActive',
				options: [
					{ label: 'Active', value: true },
					{ label: 'InActive', value: false },
				],
				prompt: {
					title: 'Change Active status',
					body: 'Choose active status',
				},
			},
			{
				title: 'Update Category',
				type: 'edit-data-select',
				key: 'category',
				dataPath: 'categories',
				dataModel: createCategoryModalModel,
				prompt: {
					title: 'Update Category',
					body: 'Choose item category to update',
				},
			},
			{
				title: 'Add to collection',
				type: 'edit-data-select',
				key: 'collection',
				keyType: 'array',
				dataPath: 'collections',
				dataModel: createCollection,
				prompt: {
					title: 'Add to collection',
					body: 'Add Items to collection',
				},
			},
			{
				title: 'Export selected',
				type: 'export',
			},
		],
	},
	button: {
		title: 'Add Item',
		path: '/items/create',
	},
	menu: [
		{
			title: 'Edit',
			type: 'edit',
		},
		// {
		// 	title: 'Details',
		// 	type: 'redirect',
		// 	href: '/go/details',
		// },
		{
			title: 'View',
			type: 'view-modal',
			dataModel: viewDataModel,
		},
		{
			title: 'Duplicate Entry',
			type: 'duplicate',
		},
		// {
		// 	title: 'Custom',
		// 	type: 'custom-modal',
		// 	modal: CustomModal,
		// },
	],

	data: [
		{
			title: 'Name',
			sort: 'name',
			type: 'image-text',
			dataKey: 'name',
			imageKey: 'image',
			default: true,
		},
		{ title: 'Category', dataKey: 'category.name', default: true },

		{
			title: 'Price',
			dataKey: 'price',
			sort: 'price',
			default: true,
			editable: true,
		},

		// {
		// 	title: 'Collections',
		// 	dataKey: 'collection',
		// 	type: 'data-array-count',
		// 	default: true,
		// },

		{
			title: 'isActive',
			dataKey: 'isActive',
			type: 'tag',
			sort: 'isActive',
			default: true,
			// editable: true,
			colorScheme: (data: boolean) => (data ? 'green' : 'red'),
		},
		{
			title: 'Is Discount?',
			dataKey: 'isDiscount',
			type: 'tag',
			sort: 'isDiscount',
			default: true,
			editable: true,
			colorScheme: (data: boolean) => (data ? 'green' : 'red'),
		},
		{
			title: 'After Discount',
			dataKey: 'discountPrice',
			sort: 'discountPrice',
			default: true,
			editable: true,
		},
		{ title: 'Created', dataKey: 'createdAt', type: 'date', sort: 'createdAt' },
		{ title: '...', type: 'menu' },
	],
};

const page: NextPage = () => {
	return <PageTable table={data} />;
};

export default page;
