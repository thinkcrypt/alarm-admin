import { StatContainer } from '@/components/library/stat/stat-components';
import { useGetSelfQuery } from '@/store/services/authApi';
import {
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	Skeleton,
	Text,
	useClipboard,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import React, { ReactNode, useEffect } from 'react';
import { Icon } from '@/components/library';
import Link from 'next/link';

const SHOP_BASE_URL = process.env.NEXT_PUBLIC_SHOP_BASE_URL || 'https://mintapp.store';

// STYLING
const COL_SPAN = { base: 1, md: 2, lg: 2, xl: 1 };
const FONT_WEIGHT = '500';
const HEADING_FONT_SIZE = '1.5rem';
const SHOP_HEADING = 'Shop Details';

// MAIN COMPONENT
const ShopQr = () => {
	const { data, isFetching } = useGetSelfQuery({});
	const shopData = data && data;
	const SHOP_URL = `${SHOP_BASE_URL}/${shopData?.shop?.id}`;
	const toast = useToast();
	const { onCopy, setValue, hasCopied } = useClipboard('');

	useEffect(() => {
		setValue(SHOP_URL);
	}, [setValue, SHOP_URL]);

	useEffect(() => {
		hasCopied &&
			toast({
				title: 'Copied!',
				description: 'The shop URL has been copied to your clipboard.',
				status: 'success',
				duration: 3000,
				isClosable: true,
				variant: 'left-accent',
				position: 'bottom-right',
			});
	}, [toast, hasCopied]);

	const bgColor = useColorModeValue('#fff', 'container.dark');
	const fgColor = useColorModeValue('#222', '#fff');

	return (
		<GridItem colSpan={COL_SPAN}>
			<StatContainer>
				<Skeleton
					isLoaded={!isFetching}
					w={!isFetching ? '100%' : '150px'}
					h={!isFetching ? '100%' : '3rem'}>
					<Grid gridTemplateColumns={'1fr 1fr'}>
						<Box>
							<Text fontWeight={FONT_WEIGHT}>{SHOP_HEADING}</Text>
							<Heading
								as='h5'
								fontSize={HEADING_FONT_SIZE}>
								{shopData?.shop?.name}
							</Heading>
						</Box>
						<Box ml='auto'>
							<QRCode
								bgColor={bgColor}
								fgColor={fgColor}
								value={SHOP_URL}
								size={80}
							/>
						</Box>
					</Grid>

					<QrCodeWrapper>
						<Link
							href={SHOP_URL}
							target='_blank'>
							{SHOP_URL}
						</Link>
						<Box
							pos='absolute'
							right='1rem'
							cursor='pointer'
							onClick={onCopy}>
							<Icon
								size={24}
								name='copy'
							/>
						</Box>
					</QrCodeWrapper>
				</Skeleton>
			</StatContainer>
		</GridItem>
	);
};

// HELPER COMPONENTS
const QrCodeWrapper = ({ children }: { children: ReactNode }) => (
	<Flex
		pos='relative'
		justifyContent='center'
		py='0.8rem'
		borderRadius='md'
		bg='background.400'
		_dark={{ bg: 'background.dark' }}
		mt='1rem'>
		{children}
	</Flex>
);

export default ShopQr;
