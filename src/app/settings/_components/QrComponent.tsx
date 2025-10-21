// 'use client';

// import React from 'react';
// import { Button, Flex } from '@chakra-ui/react';
// import { useClipboard } from '@chakra-ui/react';
// import * as htmlToImage from 'html-to-image';
// import { useGetByIdQuery } from '@/components/library/store/services/commonApi';

// import Qr from '@/components/library/qr/Qr';

// const QrComponent = ({ id }: { id: string }) => {
// 	const target = `${process.env.NEXT_PUBLIC_URL}/qr/${id}`;
// 	const { onCopy, value, setValue, hasCopied } = useClipboard(target);

// 	const { data, isFetching } = useGetByIdQuery({ path: 'qr', id: id }, { skip: !id });

// 	const downloadQRCode = () => {
// 		const node: any = document.getElementById('qrCode');
// 		htmlToImage
// 			.toPng(node)
// 			.then(dataUrl => {
// 				const link = document.createElement('a');
// 				link.download = 'my-image-name.png';
// 				link.href = dataUrl;
// 				link.click();
// 			})
// 			.catch(error => {
// 				console.error('oops, something went wrong!', error);
// 			});
// 	};

// 	return (
// 		<>
// 			<Flex py='8px'>
// 				<Qr
// 					id='qrCode'
// 					bgColor={data?.bgColor}
// 					fgColor={data?.fgColor}
// 					innerEyeRadius={data?.innerEyeRadius}
// 					outerEyeRadius={data?.outerEyeRadius}
// 					pixelColor={data?.pixelColor}
// 					quietZone={data?.quietZone}
// 					qrStyle={data?.qrStyle}
// 					size={300}
// 					isLoading={isFetching}
// 					//isLoading={qrIsFetching}
// 					target={target}
// 					// outerEyeRadius={outerEyeRadius}
// 					// innerEyeRadius={innerEyeRadius}
// 					// quietZone={quietZone}
// 					// qrStyle={qrStyle}
// 					// bgColor={bgColor}
// 					// fgColor={fgColor}
// 					// pixelColor={pixelColor}
// 					// size={isMobile ? 140 : 300}
// 				/>
// 				{/* <QRCode
// 					id='qrCode'
// 					bgColor='#111'
// 					fgColor='white'
// 					size={128}
// 					style={{ height: 'auto', maxWidth: '300px', width: '300px', borderRadius: '4px' }}
// 					value={target}
// 					viewBox={`0 0 256 256`}
// 				/> */}
// 			</Flex>
// 			<Flex
// 				gap={2}
// 				pb={8}>
// 				<Button
// 					size='sm'
// 					colorScheme='gray'
// 					onClick={() => {
// 						onCopy();
// 					}}>
// 					{hasCopied ? 'Copied' : 'Copy Link'}
// 				</Button>
// 				<Button
// 					onClick={downloadQRCode}
// 					size='sm'>
// 					Download Qr
// 				</Button>
// 			</Flex>
// 		</>
// 	);
// };

// export default QrComponent;

import React from 'react';

const QrComponent = () => {
	return <div>QrComponent</div>;
};

export default QrComponent;
