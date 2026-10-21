import type { LectureGroup } from '../lib/lectures';
import { LectureList } from './LectureList';
import { TechnologyBadge } from './TechnologyBadge';

type TechnologySectionProps = {
	group: LectureGroup;
};

export const TechnologySection = ({ group }: TechnologySectionProps) => {
	return (
		<section className="technology-section">
			<h2 className="technology-section__title">
				<TechnologyBadge technology={group.technology} />
				<span className="technology-section__count">
					Лекций всего: {group.lectures.length}
				</span>
			</h2>
			<LectureList lectures={group.lectures} />
		</section>
	);
};
