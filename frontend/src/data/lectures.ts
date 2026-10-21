// src/data/lectures.ts
import type { Lecture } from '../types/lecture';

export const lectures: Lecture[] = [
	{
		slug: 'sql-01-pervyj-zapros',
		number: 1,
		title: 'Первый запрос SELECT',
		technology: 'SQL',
		status: 'done',
		description:
			'Как устроен запрос SELECT и в каком порядке его выполняет база',
		tags: ['sql', 'postgresql'],
	},
	{
		slug: 'react-04-lists-and-keys',
		number: 4,
		title: 'Списки и ключи',
		technology: 'REACT',
		status: 'done',
		description: 'map, key и группировка лекций по технологиям',
		tags: ['react', 'typescript'],
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
	{
		slug: 'react-03-components',
		number: 3,
		title: 'Компоненты и типизированные props',
		technology: 'REACT',
		status: 'done',
		description: 'Компоненты, JSX, props, children и композиция',
		tags: ['react', 'typescript'],
	},
];
