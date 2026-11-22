import type { Technology } from '../types/lecture';
import { technologySlug } from './technologies';

export const lecturePath = (slug: string) => {
	return `/lectures/${slug}`;
};

export const technologyPath = (technology: Technology): string => {
	return `/technologies/${technologySlug(technology)}`;
};
