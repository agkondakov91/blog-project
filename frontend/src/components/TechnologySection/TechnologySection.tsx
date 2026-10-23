import type { LectureGroup } from '../../lib/lectures';
import { LectureList } from '../LectureList/LectureList';
import { TechnologyBadge } from '../TechnologyBadge/TechnologyBadge';
import styles from './TechnologySection.module.css';

type TechnologySectionProps = {
	group: LectureGroup;
};

export const TechnologySection = ({ group }: TechnologySectionProps) => {
	return (
		<section>
			<h2 className={styles.title}>
				<TechnologyBadge technology={group.technology} />
				<span className={styles.count}>
					Лекций всего: {group.lectures.length}
				</span>
			</h2>
			<LectureList lectures={group.lectures} />
		</section>
	);
};
