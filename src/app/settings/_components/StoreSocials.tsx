'use client';

import { useGetSelfQuery } from '@/store/services/authApi';
import React, { useEffect, useState } from 'react';
import {
	useCustomToast,
	Details,
	SettingsEditContainer,
	useUpdateByIdMutation,
} from '@/components/library';

const StoreEdit = () => {
	const { data, isFetching } = useGetSelfQuery({});
	const [editing, setEditing] = useState(false);

	const [updateSelf, result] = useUpdateByIdMutation();

	const [formData, setFormData] = useState<any>({
		website: '',
		instagram: '',
		facebook: '',
		twitter: '',
		youtube: '',
		whatsapp: '',
		linkedin: '',
		daraz: '',
		tiktok: '',
		telegram: '',
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const refresh = () =>
		setFormData({
			website: data?.shop?.website || '',
			instagram: data?.shop?.instagram || '',
			facebook: data?.shop?.facebook || '',
			twitter: data?.shop?.twitter || '',
			youtube: data?.shop?.youtube || '',
			whatsapp: data?.shop?.whatsapp || '',
			linkedin: data?.shop?.linkedin || '',
			daraz: data?.shop?.daraz || '',
			tiktok: data?.shop?.tiktok || '',
			telegram: data?.shop?.telegram || '',
		});

	const handleSubmit = (e: any) => {
		e.preventDefault();

		updateSelf({
			path: '/auth/update/shop/edit',
			id: data?.shop?._id,
			invalidate: ['self'],
			body: formData,
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
		successText: 'Store Socials updated successfully',
	});

	return (
		<SettingsEditContainer
			cols='1fr 1fr'
			handleSubmit={handleSubmit}
			isLoading={result?.isLoading}
			openEdit={openEdit}
			heading='Shop Socials'
			closeEdit={closeEdit}
			editing={editing}>
			<Details
				editing={editing}
				title='Website'
				name='website'
				onChange={handleChange}>
				{formData?.website}
			</Details>
			<Details
				editing={editing}
				title='Facebook'
				name='facebook'
				onChange={handleChange}>
				{formData?.facebook}
			</Details>
			<Details
				editing={editing}
				title='Instagram'
				name='instagram'
				onChange={handleChange}>
				{formData?.instagram}
			</Details>

			<Details
				editing={editing}
				title='Twitter'
				name='twitter'
				onChange={handleChange}>
				{formData?.twitter}
			</Details>
			<Details
				editing={editing}
				title='Youtube'
				name='youtube'
				onChange={handleChange}>
				{formData?.youtube}
			</Details>
			<Details
				editing={editing}
				title='Whatsapp'
				name='whatsapp'
				onChange={handleChange}>
				{formData?.whatsapp}
			</Details>
			<Details
				editing={editing}
				title='Linkedin'
				name='linkedin'
				onChange={handleChange}>
				{formData?.linkedin}
			</Details>
			<Details
				editing={editing}
				title='Daraz'
				name='daraz'
				onChange={handleChange}>
				{formData?.daraz}
			</Details>
			<Details
				editing={editing}
				title='Tiktok'
				name='tiktok'
				onChange={handleChange}>
				{formData?.tiktok}
			</Details>
			<Details
				editing={editing}
				title='Telegram'
				name='telegram'
				onChange={handleChange}>
				{formData?.telegram}
			</Details>
		</SettingsEditContainer>
	);
};

export default StoreEdit;
