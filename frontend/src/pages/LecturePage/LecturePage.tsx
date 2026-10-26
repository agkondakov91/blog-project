import { Link, useParams } from 'react-router';
import { MarkdownContent } from '../../components/MarkdownContent/MarkdownContent';
import { TechnologyBadge } from '../../components/TechnologyBadge/TechnologyBadge';
import { lectures } from '../../data/lectures';
import { findBySlug } from '../../lib/lectures';
import { NotFoundPage } from '../NotFoundPage';
import styles from './LecturePage.module.css';

export const LecturePage = () => {
	const { slug } = useParams();
	const lecture = slug ? findBySlug(lectures, slug) : undefined;

	if (!lecture) {
		return <NotFoundPage />;
	}

	return (
		<article>
			<Link className={styles.back} to="/">
				← Все лекции
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
