import { Layout } from './components/Layout';
import { LectureCard } from './components/LectureCard';
import { lectures } from './data/lectures';
import { findBySlug, getPublished } from './lib/lectures';

function App() {
	const published = getPublished(lectures);
	const current = findBySlug(lectures, 'react-03-components');
	const css = findBySlug(lectures, 'css-01-sintaksis-i-specifichnost');

	return (
		<Layout>
			<p>Опубликовано лекций: {published.length}</p>
			<h2>Сейчас в работе</h2>
			{current ? <LectureCard lecture={current} /> : <p>Лекция не найдена</p>}
			<h2>Из другого курса</h2>
			{css && <LectureCard lecture={css} compact />}
		</Layout>
	);
}

export default App;
