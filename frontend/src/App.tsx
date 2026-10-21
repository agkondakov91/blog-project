import { Layout } from './components/Layout';
import { LectureList } from './components/LectureList';
import { TechnologySection } from './components/TechnologySection';
import { lectures } from './data/lectures';
import {
	getDrafts,
	getPublished,
	groupByTechnology,
	sortByNumber,
} from './lib/lectures';

function App() {
	const groups = groupByTechnology(sortByNumber(getPublished(lectures)));
	const drafts = sortByNumber(getDrafts(lectures));

	return (
		<Layout>
			<h1>Лекции</h1>
			{groups.map((group) => (
				<TechnologySection key={group.technology} group={group} />
			))}

			<h2>Сейчас в работе</h2>
			<LectureList lectures={drafts} compact />
		</Layout>
	);
}

export default App;
