'use client';

import { useGetSelfQuery } from '@/store/services/authApi';
import React, { useEffect, useState } from 'react';
import {
	useCustomToast,
	Details,
	SettingsEditContainer,
	useUpdateByIdMutation,
} from '@/components/library';
import moment from 'moment';
import { Flex } from '@chakra-ui/react';

const StoreEdit = () => {
	const { data, isFetching } = useGetSelfQuery({});
	const [editing, setEditing] = useState(false);

	const [updateSelf, result] = useUpdateByIdMutation();

	const [formData, setFormData] = useState<any>({
		name: '',
		email: '',
		phone: '',
		description: '',
		address: '',
		logo: '',
		expire: '',
		faq: [],
		terms: [],
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const handleImage = (e: any) => setFormData({ ...formData, logo: e });

	const refresh = () =>
		setFormData({
			name: data?.shop?.name || '',
			email: data?.shop?.email || '',
			phone: data?.shop?.phone || '',
			description: data?.shop?.description || 'N/A',
			expire: data?.shop?.expire || '',
			address: data?.shop?.address || 'N/A',
			logo: data?.shop?.logo,
			faq: data?.shop?.faq,
			terms: data?.shop?.terms,
		});

	const handleSubmit = (e: any) => {
		e.preventDefault();

		updateSelf({
			path: '/auth/update/shop/edit',
			id: data?.shop?._id,
			invalidate: ['self'],
			body: {
				name: formData?.name,
				phone: formData?.phone,
				description: formData?.description,
				address: formData?.address,
				logo: formData?.logo,
			},
		});
	};

	const closeEdit = () => {
		setEditing(false);
		refresh();
	};
	const openEdit = () => setEditing(true);

	useEffect(() => {
		if (!isFetching && data) {
			refresh();
		}
	}, [data]);

	useEffect(() => {
		if (!result?.isLoading && result?.isSuccess) {
			setEditing(false);
			refresh();
		}
	}, [result?.isLoading]);

	useCustomToast({
		...result,
		successText: 'Store Details updated successfully',
	});

	return (
		<SettingsEditContainer
			handleSubmit={handleSubmit}
			isLoading={result?.isLoading}
			openEdit={openEdit}
			heading='Shop Details'
			closeEdit={closeEdit}
			editing={editing}>
			<Details
				editing={editing}
				title='Shop Logo'
				name='logo'
				type='image'
				onChange={handleImage}>
				{formData?.logo}
			</Details>
			<Details
				editing={editing}
				title='Shop Name'
				name='name'
				onChange={handleChange}>
				{formData?.name}
			</Details>
			<Details
				editing={editing}
				title='Email'
				name='email'
				isDisabled>
				{formData?.email}
			</Details>
			<Details
				editing={editing}
				title='Phone'
				name='phone'
				onChange={handleChange}>
				{formData?.phone}
			</Details>
			<Details
				editing={editing}
				title='Expire'
				isDisabled
				name='expire'>
				{moment(formData?.expire).format('DD-MM-YYYY') || '--'}
			</Details>
			<Flex h='100px'>
				<Details
					editing={editing}
					title='Address'
					name='address'
					onChange={handleChange}
					type='textarea'>
					{formData?.address}
				</Details>
			</Flex>

			<Details
				editing={editing}
				title='Description'
				name='description'
				onChange={handleChange}
				type='textarea'>
				{formData?.description}
			</Details>

			<Details
				title='FAQ'
				body='View FAQ'
				invalidate={['self']}
				path='/auth/update/shop/edit'
				id={data?.shop?._id}
				populate={data?.shop}
				prompt={{ title: 'Frequently Asked Questions', btnText: 'Update' }}
				dataModel={[{ name: 'faq', label: 'FAQ', type: 'custom-section-array' }]}
				type='modal'>
				{formData?.faq}
			</Details>
			<Details
				title='Terms'
				body='View Terms & Conditions'
				invalidate={['self']}
				path='/auth/update/shop/edit'
				id={data?.shop?._id}
				populate={data?.shop}
				prompt={{ title: 'Terms & Conditions', btnText: 'Update' }}
				dataModel={[{ name: 'terms', label: 'Terms & Conditions', type: 'array-string' }]}
				type='modal'>
				{formData?.terms}
			</Details>
		</SettingsEditContainer>
	);
};

export default StoreEdit;
