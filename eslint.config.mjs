import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
	// import.meta.dirname is available after Node.js v20.11.0
	baseDirectory: import.meta.dirname,
});

const eslintConfig = [
	...compat.config({
		extends: ['next/core-web-vitals'],
		rules: {
			'react/no-unescaped-entities': 'off',
			'@next/next/no-page-custom-font': 'off',
			'@next/next/no-img-element': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/prefer-as-const': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
		},
	}),
];

export default eslintConfig;
