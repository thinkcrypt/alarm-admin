'use client';

import { Text } from '@chakra-ui/react';
import React from 'react';

const HeroSubTitle = ({ content, basic }: { content: any; basic: any }) => {
	return (
		<Text
			textTransform='uppercase'
			fontFamily={content?.hero?.subTitleFont || basic?.secondaryFont}
			fontSize={{
				base: `${content?.hero?.subTitleFontSizeSm}px` || `16px`,
				lg: `${content?.hero?.subTitleFontSizeLg}px` || '16px',
			}}
			_dark={{
				color: content?.hero?.subTitleColor,
			}}
			letterSpacing={content?.hero?.subTitleLetterSpacing || 0}
			lineHeight={content?.hero?.subTitleLineHeight || 1}
			fontWeight={content?.hero?.subTitleFontWeight || '400'}
			color={content?.hero?.subTitleColor}>
			{content?.hero?.subTitle}
		</Text>
	);
};

export default HeroSubTitle;
