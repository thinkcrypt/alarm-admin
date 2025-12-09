'use client';

import {
	FC,
	useEffect,
	useState,
	type Dispatch,
	type SetStateAction,
} from 'react';

type ProductForm = { variations?: any[]; stock?: number } & Record<string, any>;

import {
	FormMain,
	useCustomToast,
	useRedirect,
	CreateNav,
	CreateBody,
	useFormData,
	FormSection,
	useUpdateByIdMutation,
	useGetByIdToEditQuery,
} from '../..';
import { useParams } from 'next/navigation';

type FormPageType = {
	data: any;
};

const EditItemPage: FC<FormPageType> = ({ data: dataFields }) => {
	const { title, path, fields } = dataFields;
	const { id } = useParams<{ id: string }>();

	const { data } = useGetByIdToEditQuery({ path: path, id: id }, { skip: !id });
	// console.log('p-dataee:', data);
	const [formData, setFormData] = useFormData(fields, data) as [
		ProductForm,
		Dispatch<SetStateAction<ProductForm>>
	];
	const [changedData, setChangedData] = useState<Partial<ProductForm>>({});

	const [trigger, result] = useUpdateByIdMutation();
	const { isSuccess, isLoading, isError, error } = result;

	useRedirect({ isSuccess, isLoading, path: `/${path}` });
	useCustomToast({
		successText: 'Item Updated successfully',
		isSuccess,
		isError,
		isLoading: isLoading,
		error: error,
	});

	const syncStockWithVariants = (data: any) => {
		const variants = data?.variations ?? formData?.variations;
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
		setChangedData((prev: any) =>
			prev?.stock === total ? prev : { ...prev, stock: total }
		);
	}, [formData?.variations]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const body = syncStockWithVariants(changedData);
		trigger({ path, id, body });
	};

	return (
		<form onSubmit={handleSubmit}>
			<CreateNav isLoading={isLoading} title={title} path={path} />
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
		</form>
	);
};

export default EditItemPage;
