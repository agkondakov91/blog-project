import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { AboutPage } from './pages/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage } from './pages/HomePage';
import { LecturePage } from './pages/LecturePage/LecturePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		ErrorBoundary: ErrorPage,
		children: [
			{ index: true, Component: HomePage },
			{ path: 'lectures/:slug', Component: LecturePage },
			{ path: 'about', Component: AboutPage },
			{ path: '*', Component: NotFoundPage },
		],
	},
]);
