import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>© {new Date().getFullYear()} Образовательный портал</p>
		</footer>
	);
};
