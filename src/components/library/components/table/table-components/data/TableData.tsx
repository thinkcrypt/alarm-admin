import {
	Badge,
	BadgeProps,
	Flex,
	TableCellProps,
	Text,
	Tooltip,
	useClipboard,
	useColorMode,
} from '@chakra-ui/react';
import moment from 'moment';
import { FC } from 'react';
import { CustomTd } from '.';
import { Align, TableObjectDataProps } from '../../../..';
import { CopyIcon } from '@chakra-ui/icons';

// Define the type for the props of the TableData component
type TableDataPropsType = TableCellProps &
	TableObjectDataProps & {
		children: any;
		key: string;
		colorScheme?: any;
		item?: any;
		copy?: boolean;
		colorTheme?: any;
	};

const TableData: FC<TableDataPropsType> = ({
	children,
	id,
	copy,
	type,
	colorScheme,
	toLocaleStr,
	tagType,
	imageKey,
	key,
	item,
	...props
}) => {
	const { onCopy, hasCopied } = useClipboard(children);
	const commonProps = {
		toLocaleStr,
		colorScheme,
		key,
		type,
		tagType,
		imageKey,
		...props,
	};
	if (copy) {
		if (!children) return <TableBody {...commonProps}>--</TableBody>;
		return (
			<Tooltip label={hasCopied ? 'Copied!' : 'Click to Copy'}>
				<TableBody
					item={item}
					{...commonProps}
					cursor='pointer'
					onClick={onCopy}
					{...props}
				>
					{children}
					{<CopyIcon ml={2} />}
				</TableBody>
			</Tooltip>
		);
	}

	return (
		<TableBody item={item} {...commonProps}>
			{children}
		</TableBody>
	);
};

const TableBody: FC<TableDataPropsType> = ({
	children,
	id,
	type,
	colorScheme,
	toLocaleStr,
	tagType,
	imageKey,
	key,
	item,
	colorTheme,
	...props
}) => {
	const { colorMode } = useColorMode();
	switch (type) {
		case 'checkbox':
			return (
				<CustomTd>
					<Align gap={2}>
						<Flex
							borderRadius='full'
							h='10px'
							w='10px'
							bg={
								children?.toString() === 'true'
									? colorMode == 'dark'
										? '#50e3c2'
										: '#00a843'
									: colorMode === 'dark'
									? '#fe5f55'
									: '#EE0000'
							}
						/>
						<Text fontSize='15px' textTransform='capitalize'>
							{item?.displayValue
								? item?.displayValue[children?.toString()]
								: children?.toString()}
						</Text>
					</Align>

					{/* <Badge
						colorScheme={
							colorTheme ? colorTheme[children] : children?.toString() === 'true' ? 'green' : 'red'
						}
						{...badgeCss}>
						{item?.displayValue ? item?.displayValue[children?.toString()] : children?.toString()}
					</Badge> */}
				</CustomTd>
			);
		case 'tag': {
			const values = Array.isArray(children) ? children : [children];

			return (
				<CustomTd flexWrap='wrap' gap={2}>
					{values
						.filter(v => v !== undefined && v !== null && v !== '')
						.map((val: any, i: number) => {
							const raw = val?.toString?.() ?? val;
							const lower = typeof raw === 'string' ? raw.toLowerCase() : raw;
							let badgeColor: BadgeProps['colorScheme'] = 'gray';

							if (
								item?.colorTheme &&
								typeof lower === 'string' &&
								item.colorTheme[lower]
							) {
								badgeColor = item.colorTheme[lower];
							} else if (typeof colorScheme === 'function') {
								badgeColor = colorScheme(val);
							} else if (typeof colorScheme === 'string') {
								badgeColor = colorScheme;
							}

							// Optional mapping: item.displayValue[value]
							const label =
								item?.displayValue && raw in item.displayValue
									? item.displayValue[raw]
									: raw;

							return (
								<Badge key={i} colorScheme={badgeColor} {...badgeCss}>
									{label}
								</Badge>
							);
						})}
				</CustomTd>
			);
		}

		// case 'tag':
		// 	return (
		// 		<CustomTd flexWrap='wrap' gap={2}>
		// 			{Array.isArray(children)
		// 				? children.map((item: any, i: number) => (
		// 						<Badge
		// 							key={i}
		// 							colorScheme={
		// 								item?.colorTheme
		// 									? item?.colorTheme[item.toLowerCase()]
		// 									: colorScheme
		// 									? colorScheme(children)
		// 									: 'gray'
		// 							}
		// 							{...badgeCss}
		// 						>
		// 							{item}
		// 						</Badge>
		// 				  ))
		// 				: null}
		// 		</CustomTd>
		// 	);
		case 'number':
			return <CustomTd {...props}>{children?.toLocaleString()}</CustomTd>;

		case 'image-text':
			return (
				<CustomTd
					display='flex'
					alignItems='center'
					type='image-text'
					gap={2}
					src={imageKey}
					{...props}
				>
					{children}
				</CustomTd>
			);
		case 'time': {
			const formattedTime =
				children && moment(children).isValid()
					? moment(children).format('hh:mm A')
					: children || '--';
			return (
				<CustomTd {...dateCss} {...props}>
					{formattedTime || '--'}
				</CustomTd>
			);
		}
		case 'date-only':
			return (
				<CustomTd {...dateCss} {...props}>
					{children ? moment(children).format('DD-MM-YYYY') : '--'}
				</CustomTd>
			);
		case 'date':
			return (
				<CustomTd {...dateCss} {...props}>
					{children ? moment(children).calendar() : '--'}
				</CustomTd>
			);
		case 'boolean':
			return (
				<CustomTd
					{...props}
					// {...(colorScheme && { color: colorScheme(item?.isNewOrder) })}
				>
					{children ? 'Yes' : 'No'}
				</CustomTd>
			);

		case 'external-link':
			return (
				<CustomTd type={type} {...props}>
					{children}
				</CustomTd>
			);
		case 'file':
			return (
				<CustomTd type={type} {...props}>
					{children}
				</CustomTd>
			);

		default:
			return <CustomTd {...props}>{children}</CustomTd>;
	}
};

const dateCss: any = {
	fontSize: { base: '1rem', md: '.8rem' },
};

const badgeCss: BadgeProps = {
	fontSize: '12px',
	size: '2xs',
};

export default TableData;
