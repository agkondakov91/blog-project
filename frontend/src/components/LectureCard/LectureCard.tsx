import type { Lecture } from '../../types/lecture';
import { TechnologyBadge } from '../TechnologyBadge/TechnologyBadge';
import styles from './LectureCard.module.css';

type LectureCardProps = {
	lecture: Lecture;
	compact?: boolean;
};

export const LectureCard = ({ lecture, compact = false }: LectureCardProps) => {
	return (
		<article className={styles.card}>
			<div className={styles.meta}>
				<TechnologyBadge technology={lecture.technology} />
				<span>Лекция {lecture.number}</span>
			</div>
			<h2 className={styles.title}>{lecture.title}</h2>
			{!compact && <p className={styles.description}>{lecture.description}</p>}
			{lecture.updatedAt && (
				<p className={styles.update}>Обновлено: {lecture.updatedAt}</p>
			)}
		</article>
	);
};
