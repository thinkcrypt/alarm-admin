import { FlexChild } from '@/builder';
import React, { FC } from 'react';
import { Center, Text } from '@chakra-ui/react';

const FooterTag: FC<FlexChild> = ({ children, ...props }) => {
	return (
		<Center
			w='full'
			bg='eblack.200'
			flex={1}
			p={8}
			{...props}>
			<Text color='white.200'>{children}</Text>
		</Center>
	);
};

export default FooterTag;
