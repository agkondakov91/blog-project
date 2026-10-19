import type { Technology } from '../types/lecture';

const labels: Record<Technology, string> = {
	HTML: 'HTML',
	CSS: 'CSS',
	GIT: 'GIT',
	JAVASCRIPT: 'JavaScript',
	PYTHON: 'Python',
	SQL: 'SQL',
	REACT: 'React',
};

type TechnologyBadgeProps = {
	technology: Technology;
};

export const TechnologyBadge = ({ technology }: TechnologyBadgeProps) => {
	return (
		<span className={`badge badge--${technology.toLowerCase()}`}>
			{labels[technology]}
		</span>
	);
};
