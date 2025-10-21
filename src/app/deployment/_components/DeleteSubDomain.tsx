'use client';
import React, { useState } from 'react';
import { Heading, Text, Link as ChakraLink, Button } from '@chakra-ui/react';
import {
	Column,
	useGetByIdQuery,
	usePostMutation,
	useCustomToast,
	ConfigContainer,
	ConfigContainerBody,
	ConfigContainerFooter,
	useGetOneQuery,
} from '@/components/library';
import Link from 'next/link';
import Alert from '@/components/library/components/table/table-components/modals/Alert';

const REDIRECT_LIMT = '#';

const DeleteSubDomain = () => {
	const { data, isFetching, isError, error, isSuccess }: any = useGetOneQuery({
		path: 'deployments',
	});

	const [trigger, result] = usePostMutation();

	const onDelete = () => {
		trigger({
			path: 'deployments/delete',
			body: { id: data?._id },
			invalidate: ['contents', 'deployments', 'deployments/status'],
		});
	};

	useCustomToast({ ...result, successText: 'Subdomain removed successfully' });

	if (!data || isError) return null;

	return (
		<ConfigContainer heading='Remove Subdomain'>
			<ConfigContainerBody>
				<Column pb={6}>
					<Text>
						By clicking the Remove button, your project will be taken offline from the following
						subdomain:
					</Text>

					<Text as='li'>
						<strong>https://{data?.domain}</strong>
					</Text>
					<Text as='li'>
						<strong>Important:</strong> Removing your subdomain will not delete your project—it will
						only unpublish it from the live URL. You can redeploy it anytime.
					</Text>
				</Column>
			</ConfigContainerBody>
			<ConfigContainerFooter justify='space-between'>
				<Link href={REDIRECT_LIMT}>
					<Text>Learn more about removing domains</Text>
				</Link>
				<Alert
					success={result.isSuccess}
					loading={result.isLoading}
					handler={onDelete}
					prompt={{
						title: 'Are You Sure?',
						body: `This action will unpublish your project from the subdomain: https://${data?.domain}. This action is irreversible. You will not be able to recover the subdomain once it is removed. However, your project will remain in your account and can be redeployed with a new subdomain.`,
					}}>
					<Button colorScheme='red'>Remove</Button>
				</Alert>
			</ConfigContainerFooter>
		</ConfigContainer>
	);
};

export default DeleteSubDomain;
