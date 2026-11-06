import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { contentPlugin } from './scripts/content-plugin.ts';

export default defineConfig({
	plugins: [react(), contentPlugin()],
	build: {
		// Порог поднят осознанно: самый большой файл сборки — код страницы
		// лекции с библиотеками Markdown, и загружается он только на ней.
		// Если предупреждение появится снова — разбираемся заново.
		chunkSizeWarningLimit: 600,
	},
});
