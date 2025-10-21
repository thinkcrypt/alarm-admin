import React, { FC, ReactNode } from 'react';
import { getAlignment } from '../../index';
import { FlexProps, Center } from '@chakra-ui/react';

type ContainerType = FlexProps & {
	content: any;
	children: ReactNode;
};

const HongoHeroContainer: FC<ContainerType> = ({ content, children, ...props }) => {
	return (
		<Center
			w={{ base: '100%', lg: '80%' }}
			flexDir='column'
			alignItems={getAlignment(content?.hero?.align)}
			gap={2}
			textAlign={content?.hero?.align}
			{...props}>
			{children}
		</Center>
	);
};

export default HongoHeroContainer;
