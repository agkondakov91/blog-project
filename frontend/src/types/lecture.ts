export const TECHNOLOGIES = [
	'HTML',
	'CSS',
	'GIT',
	'JAVASCRIPT',
	'PYTHON',
	'SQL',
	'REACT',
	'DJANGO',
] as const;

export type Technology = (typeof TECHNOLOGIES)[number];

export type LectureStatus = 'draft' | 'done';

export type Lecture = {
	slug: string;
	number: number;
	title: string;
	technology: Technology;
	status: LectureStatus;
	description: string;
	tags: string[];
	updatedAt?: string;
};
