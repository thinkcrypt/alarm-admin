'use client';

import { FC } from 'react';
import {
	useDisclosure,
	Modal,
	ModalBody,
	ModalOverlay,
	ModalCloseButton,
	Text,
	Drawer,
	DrawerOverlay,
	DrawerCloseButton,
	DrawerBody,
	ModalProps,
	DrawerProps,
} from '@chakra-ui/react';
import {
	MenuItem,
	ViewModalDataModelProps,
	Column,
	ModalContent,
	ModalHeader,
	useIsMobile,
	DrawerHeader,
	useGetByIdQuery,
} from '@/components/library';

type DeleteItemModalProps = ModalProps &
	DrawerProps & {
		title?: string;
		id: string;
		path: string;
		dataModel?: ViewModalDataModelProps[];
	};

const CustomItemModal: FC<DeleteItemModalProps> = ({ title, path, dataModel, id, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data, isFetching, isError } = useGetByIdQuery(
		{
			path: path,
			id: id,
		},
		{ skip: !id }
	);

	const getValue = (dataKey: string, type: any): any => {
		// Split the dataKey by '.' to determine if it's nested
		const keys = dataKey.split('.');
		// Determine the appropriate value based on whether the key is nested
		let value = 'n/a';
		if (keys.length === 1) {
			// Single level key, directly access the value
			value = type === 'date' ? new Date(data[dataKey]) : data[dataKey];
		} else if (keys.length === 2) {
			// Nested key, access the nested value
			const [parentKey, childKey] = keys;
			value = type === 'date' ? new Date(data[parentKey]?.[childKey]) : data[parentKey]?.[childKey];
		}
		return value;
	};

	const isMobile = useIsMobile();

	const Container = isMobile ? Drawer : Modal;
	const Overlay = isMobile ? DrawerOverlay : ModalOverlay;
	const Content = isMobile ? ModalContent : ModalContent;
	const Header = isMobile ? DrawerHeader : ModalHeader;
	const CloseButton = isMobile ? DrawerCloseButton : ModalCloseButton;
	const Body = isMobile ? DrawerBody : ModalBody;

	return (
		<>
			<MenuItem onClick={onOpen}>{title}</MenuItem>

			<Container
				isCentered
				{...(isMobile && { placement: 'bottom' })}
				{...(isMobile && { isFullHeight: false })}
				isOpen={isOpen}
				size='xl'
				onClose={onClose}>
				<Overlay />
				<Content>
					<Header>{path}</Header>
					<CloseButton />

					<Body px={0}>
						<Column
							gap={4}
							pt={2}>
							<Text>This is a custom modal</Text>
							<Text>id: {id}</Text>
							<Text>path: {path}</Text>
						</Column>
					</Body>
				</Content>
				{/* </AlertDialogOverlay> */}
			</Container>
		</>
	);
};

export default CustomItemModal;
