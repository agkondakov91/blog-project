import { useLoaderData } from 'react-router';
import { fetchLectureSummaries } from '../../api/lectures';
import { getByTechnology, getDrafts, getPublished } from '../../lib/lectures';
import { TECHNOLOGIES } from '../../types/lecture';
import { TechnologyCard } from '../TechnologyCard/TechnologyCard';
import styles from './TechnologiesPage.module.css';

export const technologiesLoader = () => {
	return fetchLectureSummaries();
};

export const TechnologiesPage = () => {
	const lectures = useLoaderData<typeof technologiesLoader>();

	const published = getPublished(lectures);
	const drafts = getDrafts(lectures);
	const activeCount = TECHNOLOGIES.filter(
		(technology) => getByTechnology(lectures, technology).length > 0,
	).length;

	return (
		<>
			<h1 className={styles.title}>Технологии</h1>
			<p className={styles.intro}>
				Лекции собраны по технологиям. Выбери направление — внутри лекции идут
				по порядку, от первой к последней.
			</p>

			<dl className={styles.stats}>
				<div>
					<dt>направлений</dt>
					<dd>{activeCount}</dd>
				</div>
				<div>
					<dt>лекций</dt>
					<dd>{published.length}</dd>
				</div>
				<div>
					<dt>в работе</dt>
					<dd>{drafts.length}</dd>
				</div>
			</dl>

			<ul className={styles.grid}>
				{TECHNOLOGIES.map((technology) => {
					const ofTechnology = getByTechnology(lectures, technology);
					return (
						<li key={technology}>
							<TechnologyCard
								technology={technology}
								publishedCount={getPublished(ofTechnology).length}
								draftCount={getDrafts(ofTechnology).length}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
};
