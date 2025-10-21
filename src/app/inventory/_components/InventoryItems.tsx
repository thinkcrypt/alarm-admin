'use client';
import { useGetAllQuery, ShowSum } from '@/components/library';
import React from 'react';
import { Grid } from '@chakra-ui/react';

const InventoryItems = () => {
	const { data } = useGetAllQuery({ path: 'inventory' });
	return (
		<Grid
			w='full'
			templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}
			gap={4}>
			<ShowSum title='Products'>{data?.summary?.totalProducts}</ShowSum>
			<ShowSum title='Inventory Items'>{data?.summary?.totalInventoryItems}</ShowSum>
			<ShowSum title='In Stock'>{data?.summary?.inStock}</ShowSum>
			<ShowSum title='Out of Stock'>{data?.summary?.outOfStock}</ShowSum>
		</Grid>
	);
};

export default InventoryItems;
