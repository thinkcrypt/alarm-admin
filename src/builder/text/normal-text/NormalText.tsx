'use client';

import { Text, TextProps } from '@chakra-ui/react';
import React, { FC } from 'react';

type TextNormalProps = TextProps & {
	children?: React.ReactNode;
	clr?: 'primary' | 'secondary';
	font?: 'primary' | 'secondary';
	basic: any;
};

const TextNormal: FC<TextNormalProps> = ({
	basic,
	children,
	clr = 'primary',
	font = 'secondary',
	...props
}) => {
	const fontFamily = font === 'primary' ? basic.primaryFont : basic.secondaryFont;
	const colorValue = clr === 'primary' ? basic.primaryText : basic.secondaryText;

	return (
		<Text
			fontFamily={fontFamily}
			fontSize='1rem'
			fontWeight='400'
			color={colorValue}
			{...props}>
			{children}
		</Text>
	);
};

export default TextNormal;
