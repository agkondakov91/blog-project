import {
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import type { LectureSummary } from '../src/types/lecture.ts';
import { type ContentError, loadLectures } from './content.ts';

const CONTENT_DIR = fileURLToPath(new URL('../../content', import.meta.url));
const OUTPUT_DIR = fileURLToPath(new URL('../public/content', import.meta.url));

const readMarkdownFiles = (): Record<string, string> => {
	const files: Record<string, string> = {};
	for (const path of readdirSync(CONTENT_DIR, {
		recursive: true,
		encoding: 'utf8',
	})) {
		if (path.endsWith('.md')) {
			files[path] = readFileSync(join(CONTENT_DIR, path), 'utf8');
		}
	}
	return files;
};

const buildContent = (): ContentError[] => {
	const { lectures, errors } = loadLectures(readMarkdownFiles());

	rmSync(OUTPUT_DIR, { recursive: true, force: true });
	mkdirSync(join(OUTPUT_DIR, 'lectures'), { recursive: true });

	const summaries: LectureSummary[] = lectures.map(
		({ body, ...summary }) => summary,
	);
	writeFileSync(join(OUTPUT_DIR, 'lectures.json'), JSON.stringify(summaries));

	for (const lecture of lectures) {
		writeFileSync(
			join(OUTPUT_DIR, 'lectures', `${lecture.slug}.json`),
			JSON.stringify(lecture),
		);
	}

	return errors;
};

const formatErrors = (errors: ContentError[]): string => {
	return errors.map((error) => `  ${error.path}: ${error.message}`).join('\n');
};

export const contentPlugin = (): Plugin => {
	let isBuild = false;

	return {
		name: 'content',

		configResolved(config) {
			isBuild = config.command === 'build';
		},

		buildStart() {
			const errors = buildContent();
			if (errors.length === 0) {
				return;
			}
			const message = `Ошибки в контенте:\n${formatErrors(errors)}`;
			if (isBuild) {
				this.error(message);
			}
			this.warn(message);
		},

		configureServer(server) {
			server.watcher.add(CONTENT_DIR);
			server.watcher.on('all', (_event, path) => {
				if (!path.startsWith(CONTENT_DIR) || !path.endsWith('.md')) {
					return;
				}
				const errors = buildContent();
				if (errors.length > 0) {
					server.config.logger.warn(
						`Ошибки в контенте:\n${formatErrors(errors)}`,
					);
				}
				server.ws.send({ type: 'full-reload' });
			});
		},
	};
};
