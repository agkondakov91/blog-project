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
			'Собрание лекций по технологии HTML – стандартизированному языку разметки, определяющему структуру и семантику веб-страниц',
	},
	CSS: {
		label: 'CSS',
		description:
			'Собрание лекций по технологии CSS – каскадным таблицам стилей, задающим визуальное оформление и раскладку веб-страниц',
	},
	GIT: {
		label: 'Git',
		description:
			'Собрание лекций по технологии Git – распределённой системе управления версиями, отслеживающей изменения кода и упрощающей совместную разработку',
	},
	JAVASCRIPT: {
		label: 'JavaScript',
		description:
			'Собрание лекций по технологии JavaScript – высокоуровневому мультипарадигменному языку программирования, делающему веб-страницы интерактивными',
	},
	PYTHON: {
		label: 'Python',
		description:
			'Собрание лекций по технологии Python – высокоуровневому языку программирования общего назначения, широко применяемому в веб-разработке и анализе данных',
	},
	SQL: {
		label: 'SQL',
		description:
			'Собрание лекций по технологии SQL – декларативному языку структурированных запросов для работы с реляционными базами данных',
	},
	REACT: {
		label: 'React',
		description:
			'Собрание лекций по технологии React – библиотеке для построения декларативных пользовательских интерфейсов на основе компонентов',
	},
	DJANGO: {
		label: 'Django',
		description:
			'Собрание лекций по технологии Django – высокоуровневому веб-фреймворку на Python с готовым набором инструментов для разработки серверной части веб-приложений',
	},
};

export const technologySlug = (technology: Technology): string => {
	return technology.toLowerCase();
};

export const findTechnologyBySlug = (slug: string): Technology | undefined => {
	return TECHNOLOGIES.find((technology) => technologySlug(technology) === slug);
};
