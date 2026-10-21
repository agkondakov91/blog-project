import { type Lecture, TECHNOLOGIES, type Technology } from '../types/lecture';

export type LectureGroup = {
	technology: Technology;
	lectures: Lecture[];
};

export const getPublished = (lectures: Lecture[]): Lecture[] => {
	return lectures.filter((lecture) => lecture.status === 'done');
};

export const getDrafts = (lectures: Lecture[]): Lecture[] => {
	return lectures.filter((lecture) => lecture.status === 'draft');
};

export const getByTechnology = (
	lectures: Lecture[],
	technology: Technology,
): Lecture[] => {
	return lectures.filter((lecture) => lecture.technology === technology);
};

export const findBySlug = (
	lectures: Lecture[],
	slug: string,
): Lecture | undefined => {
	return lectures.findLast((lecture) => lecture.slug === slug);
};

export const sortByNumber = (lectures: Lecture[]): Lecture[] => {
	return [...lectures].sort((a, b) => a.number - b.number);
};

export const groupByTechnology = (lectures: Lecture[]): LectureGroup[] => {
	return TECHNOLOGIES.map((technology) => ({
		technology,
		lectures: getByTechnology(lectures, technology),
	})).filter((group) => group.lectures.length > 0);
};
