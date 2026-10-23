import type { ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import style from './Layout.module.css';

type LayoutProps = {
	children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={style.layout}>
			<Header />
			<main className={style.main}>{children}</main>
			<Footer />
		</div>
	);
};
