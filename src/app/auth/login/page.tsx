'use client';

import { VInput, useCustomToast, useAppDispatch, login, AuthForm } from '@/components/library';
import { useLgoinMutation } from '@/store/services/authApi';
import { useParams, useSearchParams } from 'next/navigation';
import React, { FC, ChangeEvent, useState, useEffect } from 'react';

type FormDataType = {
	email: string;
	password: string;
};

const LoginPage: FC<{}> = () => {
	const searchParams = useSearchParams();

	const [formData, setFormData] = useState<FormDataType>({
		email: '',
		password: '',
	});

	const [trigger, result] = useLgoinMutation();
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
		<AuthForm
			title='Login'
			isLoading={isLoading}
			handleSubmit={handleSubmit}>
			<VInput
				label='Email'
				isRequired
				value={formData.email}
				onChange={handleChange}
				name='email'
			/>
			<VInput
				label='Password'
				isRequired
				value={formData.password}
				onChange={handleChange}
				name='password'
				type='password'
			/>
		</AuthForm>
	);
};

export default LoginPage;
