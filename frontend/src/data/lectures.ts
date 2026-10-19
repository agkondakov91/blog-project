import type { Lecture } from '../types/lecture';

export const lectures: Lecture[] = [
	{
		slug: 'react-01-karta-proekta',
		number: 1,
		title: 'Карта проекта и первый деплой',
		technology: 'REACT',
		status: 'done',
		description:
			'Архитектура блога, Vite + React + TypeScript и первый деплой на Vercel',
		tags: ['react', 'vite', 'deploy'],
	},
	{
		slug: 'react-02-typescript-minimum',
		number: 2,
		title: 'TypeScript-минимум',
		technology: 'REACT',
		status: 'done',
		description: 'Тип лекции, union-типы, функции и режим strict',
		tags: ['react', 'typescript'],
	},
	{
		slug: 'css-01-sintaksis-i-specifichnost',
		number: 1,
		title: 'Синтаксис CSS и специфичность',
		technology: 'CSS',
		status: 'done',
		description:
			'Как устроено CSS-правило и почему побеждает именно этот селектор',
		tags: ['css'],
		updatedAt: '2026-09-15',
	},
];
