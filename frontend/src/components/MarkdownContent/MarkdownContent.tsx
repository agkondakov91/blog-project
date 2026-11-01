import 'highlight.js/styles/github.css';
import remarkCallout from '@r4ai/remark-callout';
import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';
import { Link } from 'react-router';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { findImage } from '../../data/images';
import styles from './MarkdownContent.module.css';

const HIGHLIGHT_PATTERN = /^==(.+)==$/;
const IMAGE_EMBED_PATTERN = /^!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/;
const WIKI_LINK_PATTERN = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/;

const components: Components = {
	a: ({ href = '', children }) => {
		if (href.startsWith('/')) {
			return <Link to={href}>{children}</Link>;
		}
		return (
			<a href={href} target="_blank" rel="noreferrer">
				{children}
			</a>
		);
	},

	h2: ({ children }) => {
		const match =
			typeof children === 'string' ? HIGHLIGHT_PATTERN.exec(children) : null;
		return <h2>{match ? <mark>{match[1]}</mark> : children}</h2>;
	},

	p: ({ children }) => {
		if (typeof children !== 'string') {
			return <p>{children}</p>;
		}

		const image = IMAGE_EMBED_PATTERN.exec(children);
		if (image) {
			const [, fileName, alt = ''] = image;
			const src = findImage(fileName);
			return src ? (
				<img src={src} alt={alt} />
			) : (
				<p>Картинка не найдена: {fileName}</p>
			);
		}

		const link = WIKI_LINK_PATTERN.exec(children);
		if (link) {
			const [, target, label = target] = link;
			return (
				<p>
					<Link to="/">{label}</Link>
				</p>
			);
		}

		return <p>{children}</p>;
	},
};

const remarkPlugins = [remarkGfm, remarkCallout];
const rehypePlugins = [rehypeRaw, rehypeHighlight];

type MarkdownContentProps = {
	source: string;
};

export const MarkdownContent = ({ source }: MarkdownContentProps) => {
	return (
		<div className={styles.content}>
			<Markdown
				remarkPlugins={remarkPlugins}
				rehypePlugins={rehypePlugins}
				components={components}
			>
				{source}
			</Markdown>
		</div>
	);
};
