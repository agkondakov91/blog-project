import { LectureList } from '../components/LectureList/LectureList';
import { TechnologySection } from '../components/TechnologySection/TechnologySection';
import { lectures } from '../data/lectures';
import {
	getDrafts,
	getPublished,
	groupByTechnology,
	sortByNumber,
} from '../lib/lectures';

export const HomePage = () => {
	const groups = groupByTechnology(sortByNumber(getPublished(lectures)));
	const drafts = sortByNumber(getDrafts(lectures));

	return (
		<>
			<h1>Лекции</h1>
			{groups.map((group) => (
				<TechnologySection key={group.technology} group={group} />
			))}

			<h2>Сейчас в работе</h2>
			<LectureList lectures={drafts} compact />
		</>
	);
};
