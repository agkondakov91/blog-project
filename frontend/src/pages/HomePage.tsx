import { useLoaderData } from 'react-router';
import { fetchLectureSummaries } from '../api/lectures';
import { LectureList } from '../components/LectureList/LectureList';
import { TechnologySection } from '../components/TechnologySection/TechnologySection';
import {
	getDrafts,
	getPublished,
	groupByTechnology,
	sortByNumber,
} from '../lib/lectures';

export const homeLoader = () => {
	return fetchLectureSummaries();
};

export const HomePage = () => {
	const lectures = useLoaderData<typeof homeLoader>();
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
