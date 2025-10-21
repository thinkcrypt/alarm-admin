import { ColorMode } from '@/components/library';
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
