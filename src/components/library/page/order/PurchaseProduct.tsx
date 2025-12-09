import { FC, useEffect } from 'react';
import { useState } from 'react';

import { CustomTd as Td, RowContainerBase, Icon } from '../..';
import { Box, Tr, Td as TD } from '@chakra-ui/react';
import InputElement from '../../utils/inputs/input-components/InputElement';

type PurchaseProductProps = {
	item: any;
	i: number;
	setItem: any;
	deleteItem: any;
	viewOnly?: boolean;
	isMobile?: boolean;
};

const PurchaseProduct: FC<PurchaseProductProps> = ({
	item,
	i,
	setItem,
	isMobile,
	deleteItem,
}) => {
	const [qty, setQty] = useState(1);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		setQty(Number(item?.qty || 1));
		setPrice(Number(item?.price || 0));
	}, [item?.qty, item?.price]);
	const handlePrice = (e: any) => {
		const newPrice = Number(e.target.value || 0);
		const newQty = Number(qty || 0);

		setPrice(newPrice);

		setItem({
			lineId: item.lineId,
			item,
			qty: newQty,
			price: newPrice,
			variantId: item.variantId,
		});
	};

	const handleReturnQty = (e: any) => {
		const newQty = Number(e.target.value || 0);
		if (newQty < 0) return;

		const newPrice = Number(price || 0);

		setQty(newQty);

		setItem({
			lineId: item.lineId,
			item,
			qty: newQty,
			price: newPrice,
			variantId: item.variantId,
		});
	};

	if (isMobile)
		return (
			<RowContainerBase>
				<Td heading='#'>{i + 1}</Td>
				<Td heading='Product Name'>{item?.name}</Td>
				<Td heading='Product Name'>{item?.variantName}</Td>

				<Td heading='Qty'>
					<InputElement
						size='xs'
						type='number'
						value={qty}
						onChange={handleReturnQty}
						w='100px'
					/>
				</Td>

				{/* <Td heading='Cost Price'>
					<InputElement
						size='xs'
						type='number'
						value={price}
						onChange={handlePrice}
						w='100px'
					/>
				</Td>
				<Td isNumeric heading='SubTotal'>
					{item?.subTotal}
				</Td> */}

				<Td>
					<Box cursor='pointer' onClick={() => deleteItem(item?.lineId)}>
						<Icon name='delete' />
					</Box>
				</Td>
			</RowContainerBase>
		);
	return (
		<Tr h='2.5rem'>
			<TD>{i + 1}</TD>
			<TD>{item?.name}</TD>
			<TD>{item?.variantName}</TD>

			<TD>
				<InputElement
					size='xs'
					type='number'
					value={qty}
					onChange={handleReturnQty}
					w='100px'
				/>
			</TD>

			{/* <TD>
				<InputElement
					size='xs'
					type='number'
					value={price}
					onChange={handlePrice}
					w='100px'
				/>
			</TD>
			<TD isNumeric>{item?.subTotal}</TD> */}

			<TD>
				<Box cursor='pointer' onClick={() => deleteItem(item?.lineId)}>
					<Icon name='delete' />
				</Box>
			</TD>
		</Tr>
	);
};

export default PurchaseProduct;
