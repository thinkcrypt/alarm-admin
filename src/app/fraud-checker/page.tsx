'use client';
import React, { useState } from 'react';
import { NextPage } from 'next';
import { Align, Column, Input, Layout, useGetByIdQuery } from '@/components/library';
import { StatContainer, StatLabel } from '@/components/library/stat/stat-components';
import { Grid, Heading, Button, Text, Flex } from '@chakra-ui/react';

const Page: NextPage = () => {
	const [phone, setPhone] = useState('');
	const [submittedPhone, setSubmittedPhone] = useState('');

	const { data, error, isFetching } = useGetByIdQuery(
		{ path: 'couriers', id: submittedPhone },
		{ skip: !submittedPhone }
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};

	const handleCheckClick = () => {
		setSubmittedPhone(phone);
	};

	return (
		<Layout
			pb='32px'
			title='Fraud Checker'
			path='/fraud-checker'>
			<Heading
				mt={4}
				size='md'>
				Fraud Checker
			</Heading>

			<Align>
				<Input
					placeholder='Enter phone number'
					value={phone}
					onChange={handleInputChange}
					width='300px'
					borderRightRadius={0}
				/>
				<Button
					borderLeftRadius={0}
					onClick={handleCheckClick}
					isLoading={isFetching}
					size='sm'>
					Check
				</Button>
			</Align>

			{error && <Text color='red.400'>Error fetching data</Text>}

			{data && Array.isArray(data) && data?.length > 0 && (
				<Grid
					gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }}
					gap={2}
					mt={4}>
					{data?.map((courier: any) => (
						<CourierContainer
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

			{data && Array.isArray(data) && data?.length === 0 && (
				<Text>No courier data found for this number.</Text>
			)}
		</Layout>
	);
};

export default Page;

interface CourierContainerProps {
	mainLabel?: any;
	total?: any;
	success?: any;
	cancelled?: any;
	successRate?: any;
}

const CourierContainer: React.FC<CourierContainerProps> = ({
	mainLabel,
	total,
	success,
	cancelled,
	successRate,
}) => (
	<StatContainer>
		<Align>
			<Col>
				<StatLabel style={{ fontWeight: 600, textTransform: 'uppercase' }}>{mainLabel}</StatLabel>
				<StatLabel color={successRate == '0%' ? 'red.400' : 'green.400'}>
					Success Rate: {successRate == '0%' ? 'N/A' : successRate}
				</StatLabel>
				<Flex
					flexDir='column'
					gap={1}>
					<Text fontWeight={600}>Total {total}</Text>
					<Text>
						<span style={{ fontWeight: 600 }}>Success:</span> {success}
					</Text>
					<Text>
						<span style={{ fontWeight: 600 }}>Cancelled:</span> {cancelled}
					</Text>
				</Flex>
			</Col>
		</Align>
	</StatContainer>
);

const Col = ({ children, ...props }: any) => (
	<Column
		gap={2}
		py={1}
		{...props}>
		{children}
	</Column>
);
