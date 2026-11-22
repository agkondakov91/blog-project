import { useRef } from 'react';
import {
	type LoaderFunctionArgs,
	type ShouldRevalidateFunctionArgs,
	useLoaderData,
	useSearchParams,
} from 'react-router';
import { fetchLectureSummaries } from '../../api/lectures';
import { LectureList } from '../../components/LectureList/LectureList';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useSearchShortcut } from '../../hooks/useSearchShortcut';
import {
	filterByStatus,
	getByTechnology,
	type StatusFilter,
	searchLectures,
	sortByNumber,
} from '../../lib/lectures';
import { findTechnologyBySlug, TECHNOLOGY_INFO } from '../../lib/technologies';
import { NotFoundPage } from '../NotFoundPage';
import styles from './TechnologyPage.module.css';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
	{ value: 'all', label: 'Все' },
	{ value: 'done', label: 'Опубликованные' },
	{ value: 'draft', label: 'В работе' },
];

const parseStatus = (value: string | null): StatusFilter => {
	return value === 'done' || value === 'draft' ? value : 'all';
};

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

export const technologyShouldRevalidate = ({
	currentUrl,
	nextUrl,
}: ShouldRevalidateFunctionArgs) => {
	return currentUrl.pathname !== nextUrl.pathname;
};

export const TechnologyPage = () => {
	const data = useLoaderData<typeof technologyLoader>();
	const [searchParams, setSearchParams] = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);

	useDocumentTitle(
		data ? TECHNOLOGY_INFO[data.technology].label : 'Не найдено',
	);
	useSearchShortcut(inputRef);

	if (!data) {
		return <NotFoundPage />;
	}

	const query = searchParams.get('q') ?? '';
	const status = parseStatus(searchParams.get('status'));

	const updateParam = (name: string, value: string) => {
		setSearchParams(
			(previous) => {
				const next = new URLSearchParams(previous);
				if (value === '') {
					next.delete(name);
				} else {
					next.set(name, value);
				}
				return next;
			},
			{ replace: true },
		);
	};

	const visible = searchLectures(filterByStatus(data.lectures, status), query);
	const info = TECHNOLOGY_INFO[data.technology];

	return (
		<>
			<h1 className={styles.title}>{info.label}</h1>
			<p className={styles.description}>{info.description}</p>

			<div className={styles.controls}>
				<input
					ref={inputRef}
					className={styles.search}
					type="search"
					placeholder="🔍 Поиск по лекциям – нажмите /"
					value={query}
					onChange={(e) => updateParam('q', e.target.value)}
				/>
				<div className={styles.filters}>
					{STATUS_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							className={styles.filter}
							aria-pressed={status === option.value}
							onClick={() =>
								updateParam(
									'status',
									option.value === 'all' ? '' : option.value,
								)
							}
						>
							{option.label}
						</button>
					))}
				</div>
			</div>

			<p className={styles.count}>
				Показано {visible.length} из {data.lectures.length}
			</p>

			<LectureList lectures={visible} emptyText="Ничего не нашлось" />
		</>
	);
};
