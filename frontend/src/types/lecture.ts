export type Technology =
	| 'HTML'
	| 'CSS'
	| 'GIT'
	| 'JAVASCRIPT'
	| 'PYTHON'
	| 'REACT';

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
