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
					Обучающий блог
				</Link>
				<p className={styles.tagline}>
					Фуллстек-разработка: от вёрстки до деплоя
				</p>
			</div>
			<nav className={styles.nav}>
				<NavLink className={navLinkClassName} to="/" end>
					Лекции
				</NavLink>
				<NavLink className={navLinkClassName} to="/about">
					О блоге
				</NavLink>
			</nav>
		</header>
	);
};
