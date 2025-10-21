'use client';

import { useGetSelfQuery, useUpdateSelfMutation } from '@/store/services/authApi';
import React, { useEffect, useState } from 'react';
import { useCustomToast, Details, SettingsEditContainer } from '@/components/library';

const UserEdit = () => {
	const { data, isFetching } = useGetSelfQuery({});
	const [editing, setEditing] = useState(false);

	const [updateSelf, result] = useUpdateSelfMutation();
	const [formData, setFormData] = useState<any>({
		name: '',
		email: '',
		phone: '',
		role: '',
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const refresh = () =>
		setFormData({
			name: data?.name || '',
			email: data?.email || '',
			phone: data?.phone || '',
			role: data?.role?.name || '',
		});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		updateSelf({
			name: formData.name,
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
		successText: 'Profile updated successfully',
	});

	return (
		<SettingsEditContainer
			handleSubmit={handleSubmit}
			isLoading={result?.isLoading}
			openEdit={openEdit}
			heading='User Details'
			closeEdit={closeEdit}
			editing={editing}>
			<Details
				editing={editing}
				title='Name'
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
				title='Role'
				name='role'
				isDisabled>
				{formData?.role}
			</Details>
			<Details
				editing={editing}
				title='Password'
				isPassword={true}>
				********
			</Details>
		</SettingsEditContainer>
	);
};

export default UserEdit;
