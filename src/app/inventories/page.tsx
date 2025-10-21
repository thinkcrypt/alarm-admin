'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import {
	convertToTableFields,
	PageTable,
	TableObjectProps,
	useGetAllQuery,
	shadow,
	styles,
	Column,
	applyFilters,
	useAppDispatch,
} from '@/components/library';
import { inventorySchema } from '@/models';
import { Flex, FlexProps, TextProps, Text, useStatStyles } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const tableLayout: any[] = [
	'name',
	'price',
	'cost',
	'stockInHand',
	'receivedStock',
	'incomingStock',
	'category',
	'brand',
	'vat',
	'isActive',
	'slug',
	'status',
	'sku',
	'isFeatured',
	'isDiscount',
	'discount',
	'createdAt',
	'faq',
];

const table: TableObjectProps = {
	title: 'Inventory',
	path: 'inventories',
	export: true,
	// select: {
	// 	show: true,
	// 	menu: multiSelectMenu,
	// },
	button: {
		title: 'Transfer Inventory',
		path: '/inventories/transfer',
	},
	// menu: itemMenu,
	data: convertToTableFields({ schema: inventorySchema, fields: tableLayout }),
};

const InventoriesPage: React.FC<{}> = () => {
	const { data, isLoading } = useGetAllQuery({ path: 'locations' });

	return <PageTable table={table}>{data && <WarehouseSelect data={data} />}</PageTable>;
};

const WarehouseSelect = ({ data }: { data: any }) => {
	const [val, setVal] = useState('');
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(applyFilters({ key: 'inventory.location', value: val }));
	}, []);

	const onApplyFilter = (val: string) => {
		setVal(val);
		dispatch(applyFilters({ key: 'inventory.location', value: val }));
	};
	return (
		<Column>
			<Text {...titleProps}>Select warehouse location:</Text>
			{data && (
				<Flex {...list}>
					{/* <Flex
						onClick={() => onApplyFilter('')}
						{...locationProps}
						{...(val === '' ? selectedProps : nonSelectedProps)}>
						<Text {...textStyle}>Main Warehouse</Text>
					</Flex> */}
					{data?.doc?.map((item: any, i: number) => (
						<Flex
							onClick={() => onApplyFilter(item._id)}
							{...locationProps}
							{...(val === item._id ? selectedProps : nonSelectedProps)}
							key={i}>
							<Text {...textStyle}>{item.name}</Text>
						</Flex>
					))}
				</Flex>
			)}
		</Column>
	);
};

const titleProps: TextProps = {
	fontWeight: '600',
};

const list: FlexProps = {
	gap: 1,
	flexWrap: 'wrap',
};

const selectedProps: FlexProps = {
	_light: {
		bg: 'container.borderLight',
	},
	_dark: {
		bg: 'sidebar.dark',
		borderColor: 'sidebar.dark',
	},
};

const nonSelectedProps: FlexProps = {
	cursor: 'pointer',
	borderColor: 'container.borderLight',
	_dark: {
		bg: '#222',
		borderColor: 'sidebar.dark',
	},
};

const locationProps: FlexProps = {
	_light: {
		bg: 'container.newLight',
	},

	borderWidth: 1,
	px: 4,
	py: 2,
	borderRadius: '8px',
	boxShadow: shadow.DASH,
};

const textStyle: TextProps = {
	fontSize: '.8rem',
	fontWeight: '600',
	color: 'inherit',
};

export default InventoriesPage;
