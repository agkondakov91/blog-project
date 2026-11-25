import { Link, NavLink } from 'react-router';
import styles from './Header.module.css';

const navLinkClassName = ({ isActive }: { isActive: boolean }) => {
	return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
};

export const Header = () => {
	return (
		<header className={styles.header}>
			<div>
				<Link className={styles.logo} to="/">
					Образовательный портал
				</Link>
				<p className={styles.tagline}>
					Платформа авторских лекций по веб-разработке.
				</p>
			</div>
			<nav className={styles.nav}>
				<NavLink className={navLinkClassName} to="/" end>
					Технологии
				</NavLink>
				<NavLink className={navLinkClassName} to="/about">
					О проекте
				</NavLink>
			</nav>
		</header>
	);
};
