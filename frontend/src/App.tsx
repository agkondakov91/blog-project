import { lectures } from './data/lectures';
import { findBySlug, getPublished } from './lib/lectures';

function App() {
	const published = getPublished(lectures);
	const current = findBySlug(lectures, 'react-02-typescript-minimum');

	return (
		<main className="page">
			<h1>Обучающий блог</h1>
			<p>Опубликовано лекций: {published.length}</p>
			{current ? (
				<p>Сейчас в работе: {current.title}</p>
			) : (
				<p>Лекция не найдена</p>
			)}
		</main>
	);
}

export default App;
