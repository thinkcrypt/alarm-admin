import { StatContainer } from '@/components/library/stat/stat-components';
import { useGetSelfQuery } from '@/components/library';
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
import { Icon, useGetOneQuery } from '@/components/library';
import Link from 'next/link';

const SHOP_BASE_URL = process.env.NEXT_PUBLIC_SHOP_BASE_URL || 'https://mintapp.store';

// STYLING
const COL_SPAN = { base: 1, md: 2, lg: 2, xl: 1 };
const FONT_WEIGHT = '500';
const HEADING_FONT_SIZE = '1.5rem';
const SHOP_HEADING = 'Shop Details';

// MAIN COMPONENT
const DeployQr = () => {
	const { data, isFetching } = useGetSelfQuery({});
	const shopData = data && data;
	const SHOP_URL = `${SHOP_BASE_URL}/${shopData?.shop?.id}`;
	const toast = useToast();
	const { onCopy, setValue, hasCopied } = useClipboard('');

	const {
		data: deployData,
		isFetching: deployFetching,
		isError,
		error,
		isSuccess,
	}: any = useGetOneQuery({
		path: 'deployments',
	});

	useEffect(() => {
		if (deployData) {
			setValue(`https://${deployData?.domain}`);
		}
	}, [deployData, deployFetching]);

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

	if (!deployData || isError) return null;

	return (
		<GridItem colSpan={COL_SPAN}>
			<StatContainer>
				<Skeleton
					isLoaded={!isFetching}
					w={!isFetching ? '100%' : '150px'}
					h={!isFetching ? '100%' : '3rem'}
					>
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
								value={`https://${deployData?.domain}`}
								size={80}
							/>
						</Box>
					</Grid>

					<QrCodeWrapper>
						<Link
							href={deployData?.domain ? `https://${deployData?.domain}` : '#'}
							target='_blank'>
							https://{deployData?.domain}
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

export default DeployQr;
