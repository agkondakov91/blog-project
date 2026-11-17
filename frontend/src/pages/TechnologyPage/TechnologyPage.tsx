import { useState } from 'react';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { fetchLectureSummaries } from '../../api/lectures';
import { LectureList } from '../../components/LectureList/LectureList';
import {
	getByTechnology,
	searchLectures,
	sortByNumber,
} from '../../lib/lectures';
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
	const [query, setQuery] = useState('');

	if (!data) {
		return <NotFoundPage />;
	}

	const visible = searchLectures(data.lectures, query);
	const info = TECHNOLOGY_INFO[data.technology];

	return (
		<>
			<h1 className={styles.title}>{info.label}</h1>
			<p className={styles.description}>{info.description}</p>

			<div className={styles.controls}>
				<input
					className={styles.search}
					type="search"
					placeholder="🔍 Поиск по лекциям"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>

			<p className={styles.count}>
				Показано {visible.length} из {data.lectures.length}
			</p>

			<LectureList lectures={visible} emptyText="Ничего не нашлось" />
		</>
	);
};
