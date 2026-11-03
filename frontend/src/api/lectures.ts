// src/api/lectures.ts
import type { Lecture, LectureSummary } from '../types/lecture';

const BASE_URL = '/content';

let summariesRequest: Promise<LectureSummary[]> | undefined;

const loadSummaries = async (): Promise<LectureSummary[]> => {
	const response = await fetch(`${BASE_URL}/lectures.json`);
	if (!response.ok) {
		throw new Error(`Не удалось загрузить список лекций: ${response.status}`);
	}
	return response.json();
};

export const fetchLectureSummaries = (): Promise<LectureSummary[]> => {
	summariesRequest ??= loadSummaries().catch((error: unknown) => {
		summariesRequest = undefined;
		throw error;
	});
	return summariesRequest;
};

export const fetchLecture = async (slug: string): Promise<Lecture | null> => {
	const summaries = await fetchLectureSummaries();
	if (!summaries.some((lecture) => lecture.slug === slug)) {
		return null;
	}

	const response = await fetch(`${BASE_URL}/lectures/${slug}.json`);
	if (!response.ok) {
		throw new Error(`Не удалось загрузить лекцию: ${response.status}`);
	}
	return response.json();
};
