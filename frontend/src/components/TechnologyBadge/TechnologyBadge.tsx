import { TECHNOLOGY_INFO } from '../../lib/technologies';
import type { Technology } from '../../types/lecture';
import styles from './TechnologyBadge.module.css';

const classNames: Record<Technology, string> = {
	HTML: styles.html,
	CSS: styles.css,
	GIT: styles.git,
	JAVASCRIPT: styles.javascript,
	PYTHON: styles.python,
	SQL: styles.sql,
	REACT: styles.react,
	DJANGO: styles.django,
};

type TechnologyBadgeProps = {
	technology: Technology;
};

export const TechnologyBadge = ({ technology }: TechnologyBadgeProps) => {
	return (
		<span className={`${styles.badge} ${classNames[technology]}`}>
			{TECHNOLOGY_INFO[technology].label}
		</span>
	);
};
