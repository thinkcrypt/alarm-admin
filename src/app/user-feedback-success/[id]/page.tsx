'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Center, Heading } from '@chakra-ui/react';

const SuccessPage = () => {
	const { id } = useParams();
	return (
		<Center
			flexDir='column'
			gap={4}
			flex={1}>
			<Heading fontFamily='Bebas Neue'>We have received your feedback</Heading>
			<Link href={`/qr/${id}`}>
				<Button>Go back to menu</Button>
			</Link>
		</Center>
	);
};

export default SuccessPage;
