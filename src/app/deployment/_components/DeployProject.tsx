'use client';
import React, { useState } from 'react';
import {
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Spinner,
	Text,
} from '@chakra-ui/react';
import {
	Column,
	useGetByIdQuery,
	usePostMutation,
	useCustomToast,
	ConfigContainer,
	ConfigContainerBody,
	styles,
	Align,
	ConfigContainerFooter,
	useGetOneQuery,
} from '@/components/library';
import Link from 'next/link';

const style = {
	addOn: {
		_light: { bg: 'background.light', borderColor: 'background.borderLight' },
	},
};

const REDIRECT_LIMT = '#';

const DeployProject = () => {
	const [slug, setSlug] = useState<string | null>();
	const findDeployment = useGetOneQuery({
		path: 'deployments',
	});
	const { data, isFetching, isError, error, isSuccess }: any = useGetByIdQuery(
		{
			id: slug,
			path: 'contents/deployments',
		},
		{
			skip: !slug,
		}
	);
	const [trigger, result] = usePostMutation();

	const onDeploy = (e: any) => {
		e.preventDefault();
		trigger({
			path: 'contents/deploy',
			invalidate: ['deployments', 'deployments/status', 'status', 'active-theme'],
			body: {
				slug,
			},
		});
	};
	useCustomToast({
		...result,
		successText: 'Deployment successful',
	});

	const getMessage = () => {
		if (!slug) return 'Enter your business name';
		else if (isFetching) return 'Checking...';
		else if (isError) return error?.data?.message;
		else if (isSuccess) return data?.message;
		else return '...';
	};

	if (!findDeployment?.isError) return null;

	return (
		<ConfigContainer heading='Make Your Business Live in Seconds'>
			<form onSubmit={onDeploy}>
				<ConfigContainerBody>
					<Column pb={6}>
						<Text>
							Deploying your project on a MINT subdomain is quick and effortless. Just follow these
							steps:
						</Text>
						<Text as='li'>
							Enter <strong>Your Business Name</strong> Type the name of your business or project
							into the input field (e.g., mybusiness).
						</Text>
						<Text as='li'>
							Click <strong>{`‘Deploy’`}</strong> Once {`you've`} entered the name, hit the Deploy
							button.
						</Text>
					</Column>
					<InputGroup
						size='md'
						maxW='600px'>
						<InputLeftAddon {...style?.addOn}>https://</InputLeftAddon>
						<Input
							value={slug || ''}
							onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s/g, '-'))}
							placeholder='mybusiness'
							{...styles?.bigInput}
						/>
						<InputRightAddon {...style?.addOn}>.mintapp.store</InputRightAddon>
					</InputGroup>
					<Align gap={3}>
						{isFetching && <Spinner size='sm' />}
						<Text
							fontWeight='400'
							fontStyle='italic'
							color={isFetching ? 'inherit' : isSuccess ? 'green' : 'red.500'}>
							{getMessage()}
						</Text>
					</Align>
				</ConfigContainerBody>
				<ConfigContainerFooter justify='space-between'>
					<Link href={REDIRECT_LIMT}>
						<Text>Learn more about Project Deployment</Text>
					</Link>
					<Button
						type='submit'
						isDisabled={!isSuccess}
						isLoading={result?.isLoading}
						loadingText='Deploying'>
						Deploy
					</Button>
				</ConfigContainerFooter>
			</form>
		</ConfigContainer>
	);
};

export default DeployProject;
