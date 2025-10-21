import {
	BoxProps,
	FlexProps,
	GridProps,
	HeadingProps,
	StackProps,
	TextProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export type TextChild = TextProps & {
	children?: ReactNode;
};

export type FlexChild = FlexProps & {
	children?: ReactNode;
};

export type BoxChild = BoxProps & {
	children?: ReactNode;
};

export type GridChild = GridProps & {
	children?: ReactNode;
};

export type StackChild = StackProps & {
	children?: ReactNode;
};

export type HeadingChild = HeadingProps & {
	children?: ReactNode;
};
