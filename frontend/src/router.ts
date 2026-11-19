import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { AboutPage } from './pages/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { LoadingPage } from './pages/LoadingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import {
	TechnologiesPage,
	technologiesLoader,
} from './pages/TechnologiesPage/TechnologiesPage';
import {
	TechnologyPage,
	technologyLoader,
	technologyShouldRevalidate,
} from './pages/TechnologyPage/TechnologyPage';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		ErrorBoundary: ErrorPage,
		HydrateFallback: LoadingPage,
		children: [
			{ index: true, Component: TechnologiesPage, loader: technologiesLoader },
			{
				path: 'technologies/:technology',
				Component: TechnologyPage,
				loader: technologyLoader,
				shouldRevalidate: technologyShouldRevalidate,
			},
			{
				path: 'lectures/:slug',
				lazy: async () => {
					const { LecturePage, lectureLoader } = await import(
						'./pages/LecturePage/LecturePage'
					);
					return { Component: LecturePage, loader: lectureLoader };
				},
			},
			{ path: 'about', Component: AboutPage },
			{ path: '*', Component: NotFoundPage },
		],
	},
]);
