import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

export const Layout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div className={styles.layout}>
			{isLoading && (
				<div className={styles.loaderOverlay}>
					<div className={styles.spinner} />
				</div>
			)}
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
			<ScrollRestoration />
		</div>
	);
};
