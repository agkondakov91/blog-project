import type { Technology } from '../../types/lecture';
import styles from './TechnologyBadge.module.css';

type TechnologyView = {
	label: string;
	className: string;
};

const views: Record<Technology, TechnologyView> = {
	HTML: { label: 'HTML', className: styles.html },
	GIT: { label: 'GIT', className: styles.git },
	JAVASCRIPT: { label: 'JavaScript', className: styles.javascript },
	DJANGO: { label: 'Django', className: styles.django },
	REACT: { label: 'React', className: styles.react },
	CSS: { label: 'CSS', className: styles.css },
	SQL: { label: 'SQL', className: styles.sql },
	PYTHON: { label: 'Python', className: styles.python },
};

type TechnologyBadgeProps = {
	technology: Technology;
};

export const TechnologyBadge = ({ technology }: TechnologyBadgeProps) => {
	const view = views[technology];
	return (
		<span className={`${styles.badge} ${view.className}`}>{view.label}</span>
	);
};
