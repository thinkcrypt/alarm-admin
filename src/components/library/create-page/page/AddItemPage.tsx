'use client';

import { FC, useEffect, useState } from 'react';

type ProductForm = { variations?: any[]; stock?: number } & Record<string, any>;

import {
	FormMain,
	useCustomToast,
	useRedirect,
	CreateNav,
	CreateBody,
	usePostMutation,
	useFormData,
	FormSection,
	ColorMode,
} from '../..';

type FormPageType = {
	data: any;
};

const AddItemPage: FC<FormPageType> = ({ data }) => {
	const { title, path, fields } = data;

	const [formData, setFormData] = useFormData<ProductForm>(fields);

	const [trigger, result] = usePostMutation();

	const { isSuccess, isLoading, isError, error } = result;
	const [changedData, setChangedData] = useState<Partial<ProductForm>>({});

	useRedirect({ isSuccess, isLoading, path: `/${path}` });
	useCustomToast({
		successText: 'Item added successfully',
		isSuccess,
		isError,
		isLoading: isLoading,
		error: error,
	});

	const syncStockWithVariants = (data: any) => {
		const variants = data?.variations;
		if (!Array.isArray(variants) || variants.length === 0) return data;

		const variantStock = variants.reduce(
			(sum: number, v: any) => sum + Number(v?.stock || 0),
			0
		);
		return { ...data, stock: variantStock };
	};

	useEffect(() => {
		const total =
			formData?.variations?.reduce(
				(sum: number, v: any) => sum + Number(v?.stock || 0),
				0
			) ?? 0;
		if (Number.isNaN(total)) return;
		setFormData((prev: any) =>
			prev?.stock === total ? prev : { ...prev, stock: total }
		);
	}, [formData?.variations]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const body = syncStockWithVariants(formData);
		trigger({ path, body } as any);
	};

	return (
		<form onSubmit={handleSubmit}>
			<CreateNav
				isLoading={isLoading}
				title={title}
				path={path}
			/>
			<CreateBody>
				<FormSection>
					<FormMain
						formData={formData}
						fields={fields}
						setFormData={setFormData}
						setChangedData={setChangedData}
					/>
				</FormSection>
			</CreateBody>
			<ColorMode />
		</form>
	);
};

export default AddItemPage;
