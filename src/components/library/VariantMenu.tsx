import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button as CButton,
	Flex,
} from '@chakra-ui/react';

const VariantMenu = ({
	label = 'Select Variant',
	variants = [],
	value,
	onChange,
}: {
	label?: string;
	variants: any[];
	value?: any;
	onChange: (v: any) => void;
}) => {
	if (!variants?.length) return null;

	const showLabel = (v: any) => {
		// build "size - color" label from attributes
		if (v?.attributes?.length) {
			const size = v.attributes.find((a: any) => a.label === 'size')?.value;
			const color = v.attributes.find((a: any) => a.label === 'color')?.value;
			return [size, color].filter(Boolean).join(' - ') || v.name;
		}
		return v.name;
	};

	return (
		<Menu>
			<MenuButton as={CButton} size='xs' variant='outline' borderColor={'border.light'}>
				{value ? showLabel(value) : label}
			</MenuButton>
			<MenuList maxH='220px' overflowY='auto'>
				{variants.map((v: any) => (
					<MenuItem key={v._id} onClick={() => onChange(v)}>
						<Flex justify='space-between' w='full'>
							<span>{showLabel(v)}</span>
							<span style={{ opacity: 0.7, fontSize: 12 }}>
								stock: {v.stock ?? 0}
							</span>
						</Flex>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};
export default VariantMenu;