import { useEffect } from 'react';

const SITE_NAME = 'Образовательный портал';

export const useDocumentTitle = (title: string) => {
	useEffect(() => {
		const previousTitle = document.title;
		document.title = `${title} - ${SITE_NAME}`;

		return () => {
			document.title = previousTitle;
		};
	}, [title]);
};
