import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import styles from './ErrorPage.module.css';

const getErrorMessage = (error: unknown): string => {
	if (isRouteErrorResponse(error)) {
		return `${error.status} ${error.statusText}`;
	}
	if (error instanceof Error) {
		return error.message;
	}
	return 'Неизвестная ошибка';
};

export const ErrorPage = () => {
	const error = useRouteError();

	return (
		<div className={styles.page}>
			<h1>Что-то пошло не так</h1>
			<p>{getErrorMessage(error)}</p>
			<Link to="/">Вернуться на главную</Link>
		</div>
	);
};
