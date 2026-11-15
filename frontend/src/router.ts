import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
// import { HomePage, homeLoader } from './pages/HomePage';
import {
	TechnologiesPage,
	technologiesLoader,
} from './components/TechnologiesPage/TechnologiesPage';
import { AboutPage } from './pages/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { LoadingPage } from './pages/LoadingPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		ErrorBoundary: ErrorPage,
		HydrateFallback: LoadingPage,
		children: [
			{ index: true, Component: TechnologiesPage, loader: technologiesLoader },
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
