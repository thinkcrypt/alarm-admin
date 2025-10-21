'use client';
import { Column, Layout, StaticPage, useGetOneQuery } from '@/components/library';
import { Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DeleteSubDomain, DeployProject, ExistingSubDomain } from './_components';

const section = {
	title: 'Configuration Dashboard',
	description: `Welcome to the Configuration Dashboard! Here, you can manage the deployment settings of your project, including subdomains, custom domains, and advanced options. Stay in control of how your project is hosted and accessed by your audience.`,
};

const DeploymentPage = () => {
	const { data, isFetching, isError, error, isSuccess }: any = useGetOneQuery({
		path: 'deployments',
	});
	return (
		<Layout
			title='Project deployment'
			path='deployment'>
			<StaticPage>
				<Column gap={4}>
					<Heading size='md'>{section?.title}</Heading>
					<Text>{section?.description}</Text>
				</Column>
				<Column gap={6}>
					<DeployProject />
					<ExistingSubDomain />
					<DeleteSubDomain />
				</Column>
			</StaticPage>
		</Layout>
	);
};

export default DeploymentPage;
