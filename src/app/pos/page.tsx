'use client';

import React from 'react';
import { PosLayout as Layout, SummaryContainer } from '@/components/library';
import { Grid, Flex, FlexProps, GridProps } from '@chakra-ui/react';
import PosFilters from '@/components/library/pos/PosFilters';
import PosSearch from '@/components/library/pos/PosSearch';
import PosCart from '@/components/library/pos/PosCart';
import PorductListPos from '@/components/library/pos/PorductListPos';

const PosPage = () => {
	return (
		<>
			{/* <SideDrawer />; */}
			<Layout
				path='/pos'
				title='POS'>
				<Grid {...pageGrid}>
					<Flex {...container}>
						<Flex {...navContainer}>
							<PosSearch />

							<PosFilters
								path='categories'
								filter='category'
							/>
							<PosFilters
								path='brands'
								filter='brand'
							/>
						</Flex>
						<PorductListPos />
					</Flex>
					<SummaryContainer>
						<PosCart />
					</SummaryContainer>
				</Grid>
			</Layout>
		</>
	);
};

const pageGrid: GridProps = {
	gridTemplateColumns: {
		base: '1fr',
		md: '8fr 2fr',
	},
	maxH: '100vh',
	overflow: 'none',
};

const container: FlexProps = {
	bg: 'background.light',
	overflow: 'hidden',
	flexDir: 'column',
	gap: { base: 3, md: 1 },
};

const navContainer: FlexProps = {
	overflowX: 'scroll',
	flexDir: { base: 'column', md: 'row' },
	px: 4,
	justify: 'space-between',
	gap: 2,
	align: 'center',
};

export default PosPage;
