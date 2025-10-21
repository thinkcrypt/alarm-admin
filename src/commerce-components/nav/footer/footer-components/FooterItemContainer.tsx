import React from 'react';
import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import { FlexChild } from '@/builder';

const FooterItemContainer: FC<FlexChild> = ({ children }) => (
	<Center
		w='full'
		gap={12}
		p={8}
		borderColor='eborder.600'
		borderTopWidth={1}
		borderBottomWidth={1}>
		{children}
	</Center>
);

export default FooterItemContainer;
