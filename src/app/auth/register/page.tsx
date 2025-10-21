'use client';
import Attendance from '@/components/attendance/Attendance';
import { VInput, useCustomToast, useAppDispatch } from '@/components/library';
import { useRegisterMutation } from '@/store/services/authApi';
import { login } from '@/components/library/store/slices/authSlice';
import React, { FC, ChangeEvent, useState, useEffect } from 'react';

const RegisterPage: FC<{}> = () => {
	const [formData, setFormData] = useState<any>({
		name: undefined,
		email: undefined,
		shopName: undefined,
		phone: undefined,
		password: undefined,
		confirm: undefined,
	});

	const [trigger, result] = useRegisterMutation();
	const dispatch = useAppDispatch();

	const { isSuccess, isError, isLoading, error } = result;
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		trigger(formData);
	};

	useEffect(() => {
		if (result.isSuccess) {
			dispatch(login(result.data));
		}
	}, [isLoading]);

	useCustomToast({
		isError,
		isLoading: isLoading,
		error: error,
	});

	return (
		<Attendance
			title='Register'
			isLoading={isLoading}
			handleSubmit={handleSubmit}
			h='100%'
			py='128px'>
			<VInput
				label='Your Full Name'
				isRequired
				value={formData.name}
				onChange={handleChange}
				name='name'
			/>
			<VInput
				label='Shop Name'
				isRequired
				value={formData.shopName}
				onChange={handleChange}
				name='shopName'
			/>
			<VInput
				label='Email'
				isRequired
				value={formData.email}
				onChange={handleChange}
				name='email'
			/>
			<VInput
				label='Package'
				value={'14 Days Trial'}
				isDisabled
			/>
			<VInput
				label='Phone Number'
				value={formData.phone}
				onChange={handleChange}
				name='phone'
			/>

			<VInput
				label='Password'
				isRequired
				value={formData.password}
				onChange={handleChange}
				name='password'
				type='password'
			/>
			<VInput
				label='Confirm Passsword'
				isRequired
				value={formData.confirm}
				onChange={handleChange}
				name='confirm'
				type='password'
			/>
		</Attendance>
	);
};

export default RegisterPage;
