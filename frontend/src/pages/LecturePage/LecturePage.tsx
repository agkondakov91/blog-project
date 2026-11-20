import { Link, type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { fetchLecture } from '../../api/lectures';
import { MarkdownContent } from '../../components/MarkdownContent/MarkdownContent';
import { TechnologyBadge } from '../../components/TechnologyBadge/TechnologyBadge';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { technologyPath } from '../../lib/paths';
import { TECHNOLOGY_INFO } from '../../lib/technologies';
import { NotFoundPage } from '../NotFoundPage';
import styles from './LecturePage.module.css';

export const lectureLoader = ({ params }: LoaderFunctionArgs) => {
	return params.slug ? fetchLecture(params.slug) : null;
};

export const LecturePage = () => {
	const lecture = useLoaderData<typeof lectureLoader>();
	useDocumentTitle(lecture ? lecture.title : 'Не найдено');

	if (!lecture) {
		return <NotFoundPage />;
	}

	return (
		<article>
			<Link className={styles.back} to={technologyPath(lecture.technology)}>
				← {TECHNOLOGY_INFO[lecture.technology].label}
			</Link>
			<div className={styles.meta}>
				<TechnologyBadge technology={lecture.technology} />
				<span>Лекция {lecture.number}</span>
			</div>
			<h1 className={styles.title}>{lecture.title}</h1>
			<p className={styles.description}>{lecture.description}</p>
			{lecture.status === 'draft' && (
				<p className={styles.draft}>Лекция в работе: текст может меняться.</p>
			)}
			<ul className={styles.tags}>
				{lecture.tags.map((tag) => (
					<li key={tag}>#{tag}</li>
				))}
			</ul>
			<MarkdownContent source={lecture.body} />
		</article>
	);
};
