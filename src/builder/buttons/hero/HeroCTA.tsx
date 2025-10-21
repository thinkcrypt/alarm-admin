'use client';

import React from 'react';
import { getAlignment } from '../../index';
import { Button, Flex, Center } from '@chakra-ui/react';
import Link from 'next/link';

const HeroCTA = ({ content }: { content: any }) => {
	return (
		<Center
			justifyContent={getAlignment(content?.hero?.align)}
			alignItems={getAlignment(content?.hero?.align)}
			w='full'>
			<Button
				fontSize={content?.hero?.btnFontSize ? `${content?.hero?.btnFontSize}px` : '0'}
				h={content?.hero?.btnHeight ? `${content?.hero?.btnHeight}px` : '44px'}
				w={content?.hero?.btnWidth ? `${content?.hero?.btnWidth}px` : '100px'}
				color={content?.hero?.btnTextColor}
				bg={content?.hero?.btnColor}
				borderRadius={content?.hero?.btnRadius ? `${content?.hero?.btnRadius}px` : '0'}
				_hover={{
					bg: content?.hero?.btnHoverColor,
					color: content?.hero?.btnHoverTextColor,
					borderColor: content?.hero?.btnHoverBorderColor,
				}}>
				{content?.hero?.btnText}
			</Button>
		</Center>
	);
};

export default HeroCTA;
