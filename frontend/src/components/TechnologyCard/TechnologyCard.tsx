import { Link } from 'react-router';
import { technologyPath } from '../../lib/paths';
import { TECHNOLOGY_INFO } from '../../lib/technologies';
import type { Technology } from '../../types/lecture';
import { TechnologyBadge } from '../TechnologyBadge/TechnologyBadge';
import styles from './TechnologyCard.module.css';

type TechnologyCardProps = {
	technology: Technology;
	publishedCount: number;
	draftCount: number;
};

export const TechnologyCard = ({
	technology,
	publishedCount,
	draftCount,
}: TechnologyCardProps) => {
	const info = TECHNOLOGY_INFO[technology];
	const isEmpty = publishedCount + draftCount === 0;

	return (
		<article className={styles.card}>
			<TechnologyBadge technology={technology} />
			<h2 className={styles.title}>{info.label}</h2>
			<p className={styles.description}>{info.description}</p>
			{isEmpty ? (
				<p className={styles.soon}>Скоро</p>
			) : (
				<>
					<p className={styles.stats}>
						Лекций: {publishedCount}
						{draftCount > 0 && ` · в работе: ${draftCount}`}
					</p>
					<Link className={styles.link} to={technologyPath(technology)}>
						Перейти к лекциям →
					</Link>
				</>
			)}
		</article>
	);
};
