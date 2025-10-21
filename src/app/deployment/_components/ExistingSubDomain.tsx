'use client';
import React, { useEffect, useState } from 'react';
import { Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import {
	Column,
	useGetByIdQuery,
	ConfigContainer,
	ConfigContainerBody,
	ConfigContainerFooter,
	useGetOneQuery,
} from '@/components/library';
import Link from 'next/link';

const REDIRECT_LIMT = '#';

const ExistingSubDomain = () => {
	const { data, isFetching, isError, error, isSuccess }: any = useGetOneQuery({
		path: 'deployments',
	});

	const [status, setStatus] = useState('NOT READY');

	const {
		data: deployStatus,
		isLoading: deployStatusLoading,
		isFetching: deployStatusFetching,
		refetch,
		isUninitialized,
	} = useGetByIdQuery(
		{
			path: 'deployments/status',
			id: data?.deploymentId,
			invalidate: ['deployments', 'deployments/status'],
		},
		{
			skip: status == 'READY',
			pollingInterval: 10000,
		}
	);

	useEffect(() => {
		if (deployStatusFetching) return;
		if (status != 'READY' && !deployStatusFetching) {
			console.log(deployStatus?.status);
			setStatus(() => deployStatus?.status);
		}
	}, [deployStatusFetching]);

	useEffect(() => {
		!isUninitialized && refetch();
	}, [isFetching]);

	// useEffect(() => {
	// 	let intervalId: any;
	// 	if (!isFetching && data) {
	// 		if (status == 'READY') return;
	// 		intervalId = setInterval(() => {
	// 			let secondStatus = deployStatus?.status;
	// 			if (!data || isError) {
	// 				console.log('clearing interval', status, secondStatus);
	// 				clearInterval(intervalId);
	// 				return;
	// 			} else if (status == 'READY') {
	// 				console.log('clearing interval', status, secondStatus);
	// 				clearInterval(intervalId);
	// 				return;
	// 			} else {
	// 				console.log('not clearing interval', status, secondStatus);
	// 				deployStatus?.refetch();
	// 			}
	// 		}, 10000);
	// 	}
	// }, [isFetching]);

	if (!data || isError) return null;

	return (
		<ConfigContainer heading='Your Project is Now Live'>
			<ConfigContainerBody>
				<Column pb={6}>
					<Text>
						Congratulations! Your project has been successfully deployed and is now live on the
						following subdomain:
					</Text>

					{deployStatusLoading ? null : deployStatus?.status == 'READY' ? (
						<ChakraLink
							isExternal
							href={`https://${data?.domain}`}>
							<Text as='li'>
								<strong>https://{data?.domain}</strong>
							</Text>
						</ChakraLink>
					) : (
						<>
							<Text>Your project is being deployed. This might need a couple of minutes.</Text>
							<Text as='li'>
								Status: <strong>{deployStatus?.status}</strong>
							</Text>
						</>
					)}
				</Column>
				<Column pb={6}>
					<Heading size='sm'>{'What’s Next?'}</Heading>
					<Text as='li'>
						Share your live project link with customers to boost your online presence.
					</Text>
					<Text as='li'>
						Start customizing your website further or explore {`MINT’s`} advanced features, like
						eCommerce customization and analytics.
					</Text>
				</Column>
			</ConfigContainerBody>
			<ConfigContainerFooter justify='space-between'>
				<Link href={REDIRECT_LIMT}>
					<Text>Learn more about managing your project</Text>
				</Link>
			</ConfigContainerFooter>
		</ConfigContainer>
	);
};

export default ExistingSubDomain;
