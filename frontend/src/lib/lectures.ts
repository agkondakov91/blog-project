import type { Lecture, Technology } from '../types/lecture';

export const getPublished = (lectures: Lecture[]): Lecture[] => {
	return lectures.filter((lecture) => lecture.status === 'done');
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
