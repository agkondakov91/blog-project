import { loadLectures } from '../lib/content';

const files = import.meta.glob<string>('../../../content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});

const { lectures, errors } = loadLectures(files);

if (errors.length > 0) {
	console.error('Ошибки в контенте:', errors);
}

export { lectures };
