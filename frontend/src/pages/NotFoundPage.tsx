import { Link } from 'react-router';

export const NotFoundPage = () => {
	return (
		<>
			<h1>Страница не найдена</h1>
			<p>Возможно, ссылка устарела или в адресе опечатка.</p>
			<Link to="/">Вернуться к списку лекций</Link>
		</>
	);
};
