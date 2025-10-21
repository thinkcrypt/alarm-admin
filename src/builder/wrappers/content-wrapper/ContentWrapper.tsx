'use client';

// import { useGetStoreQuery } from '@/store/services/storeApi';
import { FC, ReactNode } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

type Type = {
	children?: ReactNode;
};

const ContentWrapper: FC<Type> = ({ children }) => {
	// const { data, isLoading, isFetching, isError } = useGetStoreQuery({});

	return children;
};

export default ContentWrapper;
