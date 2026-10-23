import type { Lecture } from '../../types/lecture';
import { LectureCard } from '../LectureCard/LectureCard';
import styles from './LectureList.module.css';

type LectureListProps = {
	lectures: Lecture[];
	compact?: boolean;
};

export const LectureList = ({
	lectures,
	compact = false,
}: LectureListProps) => {
	if (lectures.length === 0) {
		return <p className={styles.empty}>Здесь пока нет лекций</p>;
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
