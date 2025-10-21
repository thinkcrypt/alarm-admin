'use client';

import React from 'react';
import { Column, Layout, StaticPage } from '@/components/library';
import { UserEdit, StoreEdit, StoreSocials, StoreSeo } from './_components';
import { Heading, Text } from '@chakra-ui/react';

const section = {
	title: 'User Settings',
	description: `Welcome to the User Settings! Here, you can details of your account, including your name, email, phone number, and role. Stay in control of your account and how you interact with the platform.`,
};

const SettingsPage = () => {
	return (
		<Layout
			title='Settings'
			path='settings'>
			<StaticPage>
				<Column gap={4}>
					<Heading size='md'>{section?.title}</Heading>
					<Text>{section?.description}</Text>
				</Column>
				<Column gap={6}>
					<UserEdit />
					<StoreEdit />
					<StoreSocials />
					<StoreSeo />
				</Column>
			</StaticPage>
		</Layout>
	);
};

export default SettingsPage;
