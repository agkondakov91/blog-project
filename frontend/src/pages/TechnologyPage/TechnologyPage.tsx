import { type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { fetchLectureSummaries } from '../../api/lectures';
import { LectureList } from '../../components/LectureList/LectureList';
import { TechnologyBadge } from '../../components/TechnologyBadge/TechnologyBadge';
import { getByTechnology, sortByNumber } from '../../lib/lectures';
import { findTechnologyBySlug, TECHNOLOGY_INFO } from '../../lib/technologies';
import { NotFoundPage } from '../NotFoundPage';
import styles from './TechnologyPage.module.css';

export const technologyLoader = async ({ params }: LoaderFunctionArgs) => {
	const technology = params.technology
		? findTechnologyBySlug(params.technology)
		: undefined;
	if (!technology) {
		return null;
	}

	const lectures = await fetchLectureSummaries();
	return {
		technology,
		lectures: sortByNumber(getByTechnology(lectures, technology)),
	};
};

export const TechnologyPage = () => {
	const data = useLoaderData<typeof technologyLoader>();

	if (!data) {
		return <NotFoundPage />;
	}

	const info = TECHNOLOGY_INFO[data.technology];

	return (
		<>
			<h1 className={styles.title}>{info.label}</h1>
			<p className={styles.description}>{info.description}</p>
			<LectureList lectures={data.lectures} />
		</>
	);
};
