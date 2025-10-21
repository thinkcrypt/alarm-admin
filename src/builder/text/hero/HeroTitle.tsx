'use cliennt';

import { useAppSelector } from '@/hooks';
import { Text } from '@chakra-ui/react';
import React from 'react';

const HeroTitle = ({ content, basic }: { basic: any; content: any }) => {
	const { display } = useAppSelector(state => state.builder);
	const smFontSize = content?.hero?.titleFontSizeSm || 40;
	const lgFontSize = content?.hero?.titleFontSizeLg || 84;
	return (
		<Text
			py={2}
			fontFamily={content?.hero?.titleFont || basic?.primaryFont}
			color={content?.hero?.titleColor}
			lineHeight={content?.hero?.titleLineHeight || 1}
			fontWeight={content?.hero?.titleFontWeight || '500'}
			letterSpacing={content?.hero?.subTitleLetterSpacing || 0}
			_dark={{
				color: content?.hero?.titleColor,
			}}
			fontSize={{
				base: `${content?.hero?.titleFontSizeSm}px` || `40px`,
				lg: display == 'lg' ? lgFontSize : smFontSize,
			}}>
			{content?.hero?.title}
		</Text>
	);
};

export default HeroTitle;
