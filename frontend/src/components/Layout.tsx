import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
	children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="layout">
			<Header />
			<main className="page">{children}</main>
			<Footer />
		</div>
	);
};
