import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/provider/AppProvider';

// import 'swiper/css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dashboard | ALARM BD',
	description: 'ALARM BD Admin Dashboard',
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body className={GeistSans.className}>
				{/* <C3Provider> */}
				<Providers>{children} </Providers>
				{/* </C3Provider> */}
			</body>
		</html>
	);
}
