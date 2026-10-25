import { parse } from 'yaml';
import type { Lecture, LectureStatus, Technology } from '../types/lecture';
import { TECHNOLOGIES } from '../types/lecture';

export type ContentError = {
	path: string;
	message: string;
};

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const TITLE_PREFIX_PATTERN = /^.*?Лекция\s+\d+\.\s*/;

const STATUSES: Record<string, LectureStatus> = {
	'🟢 done': 'done',
	'🟡 draft': 'draft',
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const isTechnology = (value: unknown): value is Technology => {
	return (
		typeof value === 'string' && TECHNOLOGIES.some((item) => item === value)
	);
};

const isStringArray = (value: unknown): value is string[] => {
	return (
		Array.isArray(value) && value.every((item) => typeof item === 'string')
	);
};

export const splitFrontmatter = (raw: string) => {
	const match = FRONTMATTER_PATTERN.exec(raw);
	if (!match) {
		throw new Error('в начале файла нет блока frontmatter');
	}
	return { frontmatter: match[1], body: raw.slice(match[0].length) };
};

export const titleFromPath = (path: string): string => {
	const fileName = path.split('/').at(-1) ?? path;
	return fileName.replace(/\.md$/, '').replace(TITLE_PREFIX_PATTERN, '');
};

export const makeSlug = (technology: Technology, number: number): string => {
	return `${technology.toLowerCase()}-${String(number).padStart(2, '0')}`;
};

export const parseLecture = (path: string, raw: string): Lecture => {
	const { frontmatter, body } = splitFrontmatter(raw);
	const data: unknown = parse(frontmatter);

	if (!isRecord(data)) {
		throw new Error('frontmatter должен быть набором полей');
	}

	const { technology, number, status, description, tags, slug } = data;

	if (!isTechnology(technology)) {
		throw new Error(`неизвестная технология: ${String(technology)}`);
	}
	if (typeof number !== 'number' || !Number.isInteger(number) || number < 1) {
		throw new Error(
			`номер должен быть целым числом больше нуля: ${String(number)}`,
		);
	}
	if (typeof status !== 'string' || !Object.hasOwn(STATUSES, status)) {
		throw new Error(`неизвестный статус: ${String(status)}`);
	}
	if (typeof description !== 'string') {
		throw new Error('нет описания');
	}
	if (!isStringArray(tags)) {
		throw new Error('теги должны быть списком строк');
	}
	if (slug !== undefined && typeof slug !== 'string') {
		throw new Error('slug должен быть строкой');
	}

	return {
		slug: slug ?? makeSlug(technology, number),
		number,
		title: titleFromPath(path),
		technology,
		status: STATUSES[status],
		description,
		tags,
		body,
	};
};

export const loadLectures = (files: Record<string, string>) => {
	const lectures: Lecture[] = [];
	const errors: ContentError[] = [];
	const pathsBySlug = new Map<string, string>();

	for (const [path, raw] of Object.entries(files)) {
		try {
			const lecture = parseLecture(path, raw);
			const existingPath = pathsBySlug.get(lecture.slug);

			if (existingPath) {
				errors.push({
					path,
					message: `slug ${lecture.slug} уже занят файлом ${existingPath}`,
				});
				continue;
			}

			pathsBySlug.set(lecture.slug, path);
			lectures.push(lecture);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			errors.push({ path, message });
		}
	}

	return { lectures, errors };
};
