import React from 'react';
import { StatContainer, StatLabel } from '@/components/library/stat/stat-components';
import { Align, Column } from '@/components/library';
import { Text, Flex } from '@chakra-ui/react';

interface CourierContainerProps {
	mainLabel?: any;
	total?: any;
	success?: any;
	cancelled?: any;
	successRate?: any;
}

const QcItem: React.FC<CourierContainerProps> = ({
	mainLabel,
	total,
	success,
	cancelled,
	successRate,
}) => (
	<StatContainer w='full'>
		<Column
			w='full'
			gap={2}
			py={1}>
			<StatLabel style={{ fontWeight: 600, textTransform: 'uppercase' }}>{mainLabel}</StatLabel>
			<Text color={successRate == '0%' ? 'red.400' : 'green.400'}>
				Success Rate: <span style={{ fontWeight: 600 }}> {total == 0 ? 'N/A' : successRate}</span>
			</Text>
			<Column gap={1}>
				<Text>
					<span style={{ fontWeight: 600 }}>Success:</span> {success}
				</Text>
				<Text>
					<span style={{ fontWeight: 600 }}>Cancelled:</span> {cancelled}
				</Text>
			</Column>
		</Column>
	</StatContainer>
);

export default QcItem;
