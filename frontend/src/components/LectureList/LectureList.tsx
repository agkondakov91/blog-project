import type { LectureSummary } from '../../types/lecture';
import { LectureCard } from '../LectureCard/LectureCard';
import styles from './LectureList.module.css';

type LectureListProps = {
	lectures: LectureSummary[];
	compact?: boolean;
	emptyText?: string;
};

export const LectureList = ({
	lectures,
	compact = false,
	emptyText = 'Здесь пока нет лекций',
}: LectureListProps) => {
	if (lectures.length === 0) {
		return <p className={styles.empty}>{emptyText}</p>;
	}

	return (
		<ul className={styles.list}>
			{lectures.map((lecture) => (
				<li key={lecture.slug}>
					<LectureCard lecture={lecture} compact={compact} />
				</li>
			))}
		</ul>
	);
};
