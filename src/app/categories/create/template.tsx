import ColorMode from '@/components/color-mode/ColorMode';
import { TemplateProps } from '@/types';
import React, { FC } from 'react';

const template: FC<TemplateProps> = ({ children }) => {
	return (
		<>
			{children}
			<ColorMode />
		</>
	);
};

export default template;
