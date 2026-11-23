# AGENTS.md — frontend

Файл для ИИ-агентов, работающих в этом репозитории. Читатель ничего не знает о проекте — всё описано с нуля и только по фактам из кода.

## Обзор проекта

«Обучающий блог» — статический SPA со списком лекций по фуллстек-разработке (HTML, CSS, Git, JavaScript, Python, SQL, React, Django). Лекции пишутся в Markdown, а сайт — это фронтенд, который загружает их как JSON и рендерит через React.

Репозиторий `blog-project` — мини-монорепозиторий. В корне лежит `fullstack-blog.code-workspace`, который открывает две папки:

- `content/` — исходники контента: подпапки `lec-<технология>` (например `lec-html`, `lec-css`) с файлами `*.md` и подпапкой `images/`. В git.
- `frontend/` — это приложение (текущая папка). Зависит от `content/` на уровне файловой системы.

Интерфейс, тексты и комментарии в коде — на русском. Новый код пишем так же.

## Технологический стек

- Node.js **24.x** (жёстко задано в `package.json → engines`).
- React **19** + TypeScript **~6.0** (строгий режим).
- Vite **8** со стандартным `@vitejs/plugin-react`.
- **React Router 8** (`react-router`) — data API: `createBrowserRouter`, loaders, `useLoaderData`, `useSearchParams`, lazy-маршруты.
- React Markdown + remark/rehype: `remark-gfm`, `@r4ai/remark-callout`, `rehype-highlight`, `rehype-raw`, `highlight.js`.
- **Biome 2.5** — единственный линтер и форматтер (ESLint нет, упоминания в `README.md` — остатки шаблона Vite и неактуальны).
- CSS Modules, глобальные стили — только `src/styles/`.
- Тестового фреймворка нет (см. «Тестирование»).

## Команды

```bash
npm run dev        # дев-сервер Vite (пересборка контента сработает автоматически)
npm run build      # tsc -b && vite build — проверка типов, затем продакшн-сборка в dist/
npm run preview    # локальный просмотр собранного dist/
npm run lint       # biome check .     (проверка линтом и форматтером)
npm run lint:fix   # biome check --write .  (автоисправление)
```

Проверка качества, которую нужно прогонять после изменений: `npm run lint` и `npm run build`. Оба должны проходить без ошибок.

## Как устроена сборка: конвейер контента

Это ключевая особенность проекта. Сайт не читает Markdown напрямую — есть собственный Vite-плагин:

- `scripts/content-plugin.ts` — плагин `contentPlugin()`, подключён в `vite.config.ts`. На `buildStart` читает Markdown из `content/` (путь `../../content` относительно `scripts/`), прогоняет через `scripts/content.ts` и записывает результат в `public/content/`:
  - `public/content/lectures.json` — массив `LectureSummary` (все поля кроме тела);
  - `public/content/lectures/<slug>.json` — полная лекция с `body`.
- В dev-режиме плагин следит за `content/` через watcher: при изменении `.md`-файлов контент пересобирается и клиенту шлётся `full-reload`.
- Ошибки контента: при `vite build` — фатальные (сборка падает), в dev — предупреждения в консоль сервера.
- `public/content/` — сгенерированная папка, она в `.gitignore` и не коммитится; собирается заново каждым запуском dev/build.

Формат лекции (`scripts/content.ts`):

- Файл должен начинаться с frontmatter `--- ... ---` (YAML). Обязательные поля: `technology` (строго одна из константы `TECHNOLOGIES` в `src/types/lecture.ts`), `number` (целое ≥ 1), `status` (`🟢 done` или `🟡 draft`), `description` (строка), `tags` (список строк). Поле `slug` опционально.
- `slug` по умолчанию: `<technology в нижнем регистре>-<номер, дополненный нулём до 2 цифр>`, например `html-01`. Слоги уникальны — дубль считается ошибкой контента.
- Название лекции берётся из имени файла: префикс вида `✅ Лекция 2. ` срезается.
- Поддерживаемые Markdown-расширения (рендерит `src/components/MarkdownContent/MarkdownContent.tsx`): GFM, callout-сырки `> [!info]`, подсветка кода через highlight.js, `==подсветка==` в заголовках h2, вики-вставки изображений `![[имя-файла.png|alt]]` и вики-ссылки `[[...]]`. Изображения ищутся по имени файла среди всех картинок `content/**/*.{png,jpg,jpeg,gif,svg,webp}` через `import.meta.glob` в `src/data/images.ts`.

## Архитектура приложения

Статический SPA, раздаётся с Vercel (`vercel.json` переписывает все пути на `index.html`). Данные фронтенд забирает fetch-ом из `/content/*.json` (см. `src/api/lectures.ts`); запрос списка лекций мемоизирован общим промисом, чтобы не дёргать сеть повторно.

Маршруты (`src/router.ts`), все под общим `Layout` с `ErrorBoundary` и фолбэком загрузки:

- `/` — `TechnologiesPage`: обзор направлений со статистикой.
- `/technologies/:technology` — `TechnologyPage`: список лекций направления, поиск и фильтр по статусу хранятся в search-параметрах (`?q=...&status=...`), `shouldRevalidate` отключает лишние перезагрузки. Фокус на поле поиска — по клавише `/` (хук `useSearchShortcut`).
- `/lectures/:slug` — `LecturePage`, маршрут **ленивый** (`lazy`), чтобы библиотеки Markdown грузились только на странице лекции.
- `/about`, `*` — `NotFoundPage`.

Структура `src/`:

- `api/` — загрузка контентных JSON (`fetchLectureSummaries`, `fetchLecture`).
- `lib/` — чистые функции-помощники: фильтрация/сортировка/поиск лекций (`lectures.ts`), справочник направлений `TECHNOLOGY_INFO` (`technologies.ts`), построение путей (`paths.ts`).
- `types/` — общие типы `Lecture`, `LectureSummary`, `Technology`, `TECHNOLOGIES`.
- `data/` — реестр изображений контента.
- `hooks/` — кастомные React-хуки: `useDocumentTitle` (заголовок вкладки «<страница> - Обучающий блог» с восстановлением прежнего при размонтировании, подключён на всех трёх страницах: список направлений, направление, лекция) и `useSearchShortcut` (фокус на поле поиска по клавише `/`, только на странице направления).
- `components/` — один компонент = папка `ComponentName/` с `ComponentName.tsx` и `ComponentName.module.css`, именованный экспорт.
- `pages/` — страницы по тому же принципу (часть простых страниц — отдельными `.tsx`-файлами: `AboutPage.tsx`, `NotFoundPage.tsx`, `LoadingPage.tsx`).
- `styles/` — `global.css` (импортируется в `main.tsx`) и `tokens.css` (дизайн-токены: цвета, отступы).

## Соглашения по стилю кода

Задаются `biome.json` и tsconfig, VS Code (`settings.json`) форматирует Biome при сохранении:

- Отступы — **табы**, строки — одинарные кавычки, точки с запятой обязательны; Biome при сохранении также организует импорты (`organizeImports`).
- Импорты типов — только через `import type` (`verbatimModuleSyntax` в tsconfig): `import type { Lecture } from '../types/lecture'`.
- В импортах указывается расширение файла: `from './content.ts'`, `from '../types/lecture.ts'` (`allowImportingTsExtensions`).
- Компоненты и страницы — функции с именованным экспортом, типы пропсов называются `<Имя>Props`.
- Стили — CSS Modules (`styles.module.css`), классы через `styles.имя`; глобальные правила не добавлять (все стили уже через `global.css`/модули).
- Запрещено: неиспользуемые переменные/параметры, switch с провалами, non-null assertion без обязательного комментария `// biome-ignore` с пояснением (пример — `src/main.tsx`).
- Локали, статусы и служебные строки контента (статусы `🟢 done`/`🟡 draft`, эмодзи-префиксы имён файлов) — часть формата данных, менять их нельзя без синхронной правки `scripts/content.ts`.

Порог предупреждения о размере чанка в `vite.config.ts` осознанно поднят до 600 kB (самый большой чанк — страница лекции с Markdown-библиотеками, грузится только там). Если предупреждение вернётся — разбираться, а не просто поднимать лимит.

## Тестирование

Автотестов нет: ни фреймворка, ни файлов тестов, ни команды в `package.json`. Регрессия ловится связкой `npm run lint` + `npm run build` (включая валидацию контента плагином) и ручной проверкой в `npm run dev` / `npm run preview`.

## Деплой

Статическая раздача на **Vercel**: сборка `npm run build`, публикация `dist/`, `vercel.json` обеспечивает SPA-fallback всех маршрутов на `index.html`. Ручного CI в репозитории нет — достаточно, чтобы локально проходили `lint` и `build`.

## Заметки для агента

- Меняя формат контента, правьте синхронно `scripts/content.ts` и это описание.
- Добавляя направление — константу в `src/types/lecture.ts` **и** запись в `TECHNOLOGY_INFO` (`src/lib/technologies.ts`), иначе контент с новой технологией не распарсится.
- `dist/` и `public/content/` — артефакты сборки, в git не коммитить и не редактировать руками.
