import type {
	LectureStatus,
	LectureSummary,
	Technology,
} from '../types/lecture';

export type StatusFilter = LectureStatus | 'all';

export const getPublished = (lectures: LectureSummary[]): LectureSummary[] => {
	return lectures.filter((lecture) => lecture.status === 'done');
};

export const getDrafts = (lectures: LectureSummary[]): LectureSummary[] => {
	return lectures.filter((lecture) => lecture.status === 'draft');
};

export const getByTechnology = (
	lectures: LectureSummary[],
	technology: Technology,
): LectureSummary[] => {
	return lectures.filter((lecture) => lecture.technology === technology);
};

export const sortByNumber = (lectures: LectureSummary[]): LectureSummary[] => {
	return [...lectures].sort((a, b) => a.number - b.number);
};

export const filterByStatus = (
	lectures: LectureSummary[],
	status: StatusFilter,
): LectureSummary[] => {
	if (status === 'all') {
		return lectures;
	}
	return lectures.filter((lecture) => lecture.status === status);
};

export const searchLectures = (
	lectures: LectureSummary[],
	query: string,
): LectureSummary[] => {
	const normalized = query.trim().toLowerCase();
	if (normalized === '') {
		return lectures;
	}
	return lectures.filter((lecture) => {
		const text = [lecture.title, lecture.description, ...lecture.tags]
			.join(' ')
			.toLowerCase();
		return text.includes(normalized);
	});
};
