import styles from './Header.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<a className={styles.logo} href="/">
				Обучающий блог
			</a>
			<p className={styles.tagline}>
				Фуллстек-разработка: от вёрстки до деплоя
			</p>
		</header>
	);
};
