import { Box, GridItem, Heading, Spacer, Tag, Text } from '@chakra-ui/react';
import React from 'react';
import { styles, Column, useGetSelfQuery } from '@/components/library';
import moment from 'moment';

// STYLING
const COL_SPAN = { base: 1, md: 2, lg: 2, xl: 1 };
const FONT_WEIGHT = '500';
const HEADING_FONT_SIZE = '1.5rem';
const SHOP_HEADING = 'Package Details';

// MAIN COMPONENT
const PackageCard = () => {
	const { data, isFetching } = useGetSelfQuery({});

	const getPackageStatus = (date: Date) => {
		return moment(date).isAfter(new Date());
	};

	if (isFetching || !data) return null;

	return (
		<GridItem
			colSpan={COL_SPAN}
			{...styles?.STAT_CONTAINER}>
			<Column
				gap={2}
				flex={1}
				h='full'>
				<Box>
					<Text fontWeight={FONT_WEIGHT}>{SHOP_HEADING}</Text>
					<Heading
						as='h5'
						fontSize={HEADING_FONT_SIZE}>
						{data?.shop?.package?.subscription?.name}
					</Heading>
					<Tag
						mt={1}
						colorScheme={getPackageStatus(data?.shop?.package?.end) ? 'green' : 'red'}>
						{getPackageStatus(data?.shop?.package?.end) ? 'Active' : 'Expired'}
					</Tag>
				</Box>
				<Spacer />
				<Column
					gap={1}
					flex={1}
					justify='flex-end'>
					<Text>Package expires on {moment(data?.shop?.package?.end).format('DD MMM YYYY')}</Text>
					<Text>
						{data?.shop?.package?.subscription?.currency}{' '}
						{data?.shop?.package?.subscription?.amount}/
						{data?.shop?.package?.subscription?.interval == 'yearly' ? 'year' : 'month'}
					</Text>
				</Column>
			</Column>
		</GridItem>
	);
};

export default PackageCard;
