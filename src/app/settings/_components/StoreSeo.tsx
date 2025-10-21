'use client';

import { useGetSelfQuery } from '@/store/services/authApi';
import React, { useEffect, useState } from 'react';
import {
	useCustomToast,
	Details,
	SettingsEditContainer,
	useUpdateByIdMutation,
} from '@/components/library';

const StoreSeo = () => {
	const { data, isFetching } = useGetSelfQuery({});
	const [editing, setEditing] = useState(false);

	const [updateSelf, result] = useUpdateByIdMutation();

	const [formData, setFormData] = useState<any>({
		metaImage: '',
		keywords: '',
		title: '',
		description: '',
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleImage = (e: any) => setFormData({ ...formData, metaImage: e });

	const refresh = () =>
		setFormData({
			metaImage: data?.shop?.metaImage || null,
			keywords: data?.shop?.metaKeywords || null,
			title: data?.shop?.meta?.title || null,
			description: data?.shop?.meta?.description || null,
		});

	const handleSubmit = (e: any) => {
		e.preventDefault();

		updateSelf({
			path: '/auth/update/shop/edit',
			id: data?.shop?._id,
			invalidate: ['self'],
			body: {
				meta: {
					title: formData?.title,
					description: formData?.description,
				},
				metaImage: formData?.metaImage,
				metaKeywords: formData?.keywords,
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
		successText: 'Store Seo updated successfully',
	});

	return (
		<SettingsEditContainer
			cols='1fr'
			handleSubmit={handleSubmit}
			isLoading={result?.isLoading}
			openEdit={openEdit}
			heading='SEO'
			closeEdit={closeEdit}
			editing={editing}>
			<Details
				editing={editing}
				title='Meta Image'
				name='metaImage'
				type='image'
				onChange={handleImage}>
				{formData?.metaImage}
			</Details>
			<Details
				editing={editing}
				title='Meta Title'
				name='title'
				onChange={handleChange}>
				{formData?.title}
			</Details>
			<Details
				editing={editing}
				title='Meta Description'
				name='description'
				type='textarea'
				onChange={handleChange}>
				{formData?.description}
			</Details>
		</SettingsEditContainer>
	);
};

export default StoreSeo;
