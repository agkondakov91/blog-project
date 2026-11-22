import type { Technology } from '../types/lecture';
import { TECHNOLOGIES } from '../types/lecture';

type TechnologyInfo = {
	label: string;
	description: string;
};

export const TECHNOLOGY_INFO: Record<Technology, TechnologyInfo> = {
	HTML: {
		label: 'HTML',
		description:
			'Собрание лекций по технологии HTML – языку разметки гипертекста',
	},
	CSS: {
		label: 'CSS',
		description:
			'Собрание лекций по технологии CSS – языку описания внешнего вида веб-страниц',
	},
	GIT: {
		label: 'Git',
		description:
			'Собрание лекций по технологии Git – распределённой системе управления версиями',
	},
	JAVASCRIPT: {
		label: 'JavaScript',
		description:
			'Собрание лекций по технологии JavaScript – высокоуровневому мультипарадигменному языку программирования',
	},
	PYTHON: {
		label: 'Python',
		description:
			'Собрание лекций по технологии Python – высокоуровневому языку программирования общего назначения',
	},
	SQL: {
		label: 'SQL',
		description:
			'Собрание лекций по технологии SQL – главному инструменту для общения с базами данных',
	},
	REACT: {
		label: 'React',
		description:
			'Собрание лекций по технологии React – популярной библиотеки для разработки пользовательских интерфейсов',
	},
	DJANGO: {
		label: 'Django',
		description:
			'Собрание лекций по технологии Django – высокоуровневому веб-фреймворку на Python для разработки серверной части сайтов',
	},
};

export const technologySlug = (technology: Technology): string => {
	return technology.toLowerCase();
};

export const findTechnologyBySlug = (slug: string): Technology | undefined => {
	return TECHNOLOGIES.find((technology) => technologySlug(technology) === slug);
};
