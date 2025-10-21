import React, { FC, ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

type BgImageProps = FlexProps & {
	src: string;
	children?: ReactNode;
	overlay?: string;
	overlayOpacity?: number;
};

const BgImage: FC<BgImageProps> = ({ src, children, overlay, overlayOpacity, ...props }) => (
	<Flex
		bgSize='cover'
		bgPosition='center center'
		bgImage={`url(${src})`}>
		<Flex
			flex={1}
			w='full'
			h='full'
			{...props}>
			{children}
		</Flex>
	</Flex>
);

export default BgImage;
