import 'highlight.js/styles/github.css';
import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';
import { Link } from 'react-router';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import styles from './MarkdownContent.module.css';

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
};

type MarkdownContentProps = {
	source: string;
};

export const MarkdownContent = ({ source }: MarkdownContentProps) => {
	return (
		<div className={styles.content}>
			<Markdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}
				components={components}
			>
				{source}
			</Markdown>
		</div>
	);
};
