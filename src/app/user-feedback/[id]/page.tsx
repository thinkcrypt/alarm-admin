'use client';

import React, { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import {
	Column,
	useGetByIdQuery,
	usePostMutation,
	useRedirect,
	useCustomToast,
} from '@/components/library';
import { Button, Center, Heading, Image } from '@chakra-ui/react';
import UserInput from '@/components/library/utils/user-input/UserInput';
import UserTextArea from '@/components/library/utils/user-input/UserTextArea';
import UserRating from '@/components/library/utils/user-input/UserRating';

const FeedbackPage: FC<{}> = () => {
	const { id } = useParams();

	const [formData, setFormData] = useState<any>({
		name: '',
		email: '',
		phone: '',
		description: '',
		rating: 1,
	});

	const [trigger, result] = usePostMutation();

	const { data: restaurant, isFetching: restaurantFetching } = useGetByIdQuery(
		{ path: 'restaurant', id: id },
		{ skip: !id }
	);

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		trigger({
			path: 'feedbacks',
			body: {
				id,
				...formData,
			},
		});
	};

	useCustomToast({
		successText: 'Feedback Submitted Successfully',
		isError: result?.isError,
		isLoading: result?.isLoading,
		error: result?.error,
	});

	useRedirect({
		isSuccess: result?.isSuccess,
		path: `/user-feedback-success/${id}`,
		isLoading: result?.isLoading,
	});

	return (
		<Column
			gap={2}
			w='full'>
			{!restaurantFetching && restaurant && restaurant?.image && (
				<Center
					flexDir='column'
					gap={4}
					pb='44px'>
					<Image
						w='200px'
						h='200px'
						objectFit='contain'
						src={restaurant?.image}
					/>
					<Heading
						size='3xl'
						textAlign='center'
						fontFamily='Bebas neue'>
						{restaurant?.name}
					</Heading>
				</Center>
			)}
			<form onSubmit={handleSubmit}>
				<Column
					w='full'
					gap={4}>
					<UserInput
						name='name'
						value={formData.name}
						label='Full Name'
						onChange={handleChange}
						isRequired
					/>
					<UserInput
						name='email'
						value={formData.email}
						label='Email'
						onChange={handleChange}
						isRequired
					/>
					<UserInput
						name='phone'
						value={formData.phone}
						label='Phone'
						onChange={handleChange}
						isRequired
					/>
					<UserTextArea
						name='description'
						value={formData.description}
						label='Detailed Review'
						onChange={handleChange}
						isRequired
					/>
					<UserRating
						rating={formData.rating}
						setRating={(e: any) => {
							setFormData({ ...formData, rating: e });
						}}
					/>
					<Button
						mt={4}
						type='submit'
						size='lg'>
						Submit Feedback
					</Button>
				</Column>
			</form>
		</Column>
	);
};

export default FeedbackPage;
