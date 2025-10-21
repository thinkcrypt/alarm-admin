import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

type ToastProps = {
	isError?: boolean;
	isSuccess?: boolean;
	error?: any;
	successText?: string;
	successTitle?: string;
	isLoading: boolean;
};

const useCustomToast = ({
	isError,
	isSuccess,
	error,
	successText,
	successTitle,
	isLoading,
}: ToastProps) => {
	const toast = useToast();

	useEffect(() => {
		if (isLoading) return;
		isError &&
			toast({
				title: 'Error',
				description: error?.data?.message,
				status: 'error',
				duration: 9000,
				isClosable: true,
				// variant: 'left-accent',
			});
	}, [isLoading]);

	useEffect(() => {
		if (isLoading) return;
		isSuccess &&
			toast({
				title: successTitle || 'Success',
				description: successText || 'success',
				status: 'success',
				duration: 9000,
				isClosable: true,
				variant: 'left-accent',
			});
	}, [isLoading]);

	return null;
};

export default useCustomToast;
