import type { LectureSummary, Technology } from '../types/lecture';
import { TECHNOLOGIES } from '../types/lecture';

export type LectureGroup = {
	technology: Technology;
	lectures: LectureSummary[];
};

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

export const groupByTechnology = (
	lectures: LectureSummary[],
): LectureGroup[] => {
	return TECHNOLOGIES.map((technology) => ({
		technology,
		lectures: getByTechnology(lectures, technology),
	})).filter((group) => group.lectures.length > 0);
};
