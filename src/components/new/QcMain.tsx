import { useState } from 'react';
import { StatContainer, StatLabel } from '@/components/library/stat/stat-components';
import { Align, useGetByIdQuery } from '@/components/library';
import { Text, Flex, Grid } from '@chakra-ui/react';
import QcItem from './QcItem';

interface CourierContainerProps {
	mainLabel?: any;
	total?: any;
	success?: any;
	cancelled?: any;
	successRate?: any;
}

const QcMain: React.FC<{ phone: string; title?: string }> = ({ phone, title }) => {
	const { data, error, isFetching, isError } = useGetByIdQuery(
		{ path: 'couriers', id: phone },
		{ skip: !phone }
	);

	if (isFetching) return null;

	return (
		<Align w='full'>
			{error && <Text color='red.400'>{(error as any)?.data?.message}</Text>}

			{data && Array.isArray(data) && data?.length > 0 && (
				<Grid
					w='full'
					gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }}
					gap={2}
					mt={4}>
					{data?.map((courier: any) => (
						<QcItem
							key={courier?.courier}
							mainLabel={courier?.courier}
							successRate={courier?.ratio}
							success={courier?.delivered}
							total={courier?.total}
							cancelled={courier?.returned}
						/>
					))}
				</Grid>
			)}
		</Align>
	);
};

export default QcMain;
