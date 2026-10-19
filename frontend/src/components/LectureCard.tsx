import type { Lecture } from '../types/lecture';
import { TechnologyBadge } from './TechnologyBadge';

type LectureCardProps = {
	lecture: Lecture;
	compact?: boolean;
};

export const LectureCard = ({ lecture, compact = false }: LectureCardProps) => {
	return (
		<article className="lecture-card">
			<div className="lecture-card__meta">
				<TechnologyBadge technology={lecture.technology} />
				<span>Лекция {lecture.number}</span>
			</div>
			<h2 className="lecture-card__title">{lecture.title}</h2>
			{!compact && (
				<p className="lecture-card__description">{lecture.description}</p>
			)}
			{lecture.updatedAt && (
				<p className="lecture-card__updated">Обновлено: {lecture.updatedAt}</p>
			)}
		</article>
	);
};
