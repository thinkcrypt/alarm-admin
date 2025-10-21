import { TemplateProps } from '@/types';
import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';

const template: FC<TemplateProps> = ({ children }) => {
	return (
		<Flex
			bg='#f8f6f3'
			flex={1}
			minH='100vh'
			px={{ base: '16px', md: '128px' }}
			w='100%'
			py={{ base: '32px', md: '62px' }}>
			{children}
		</Flex>
	);
};

export default template;
