import { Outlet, ScrollRestoration } from 'react-router';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import style from './Layout.module.css';

export const Layout = () => {
	return (
		<div className={style.layout}>
			<Header />
			<main className={style.main}>
				<Outlet />
			</main>
			<Footer />
			<ScrollRestoration />
		</div>
	);
};
