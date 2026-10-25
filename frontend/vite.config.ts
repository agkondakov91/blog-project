import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const contentDir = fileURLToPath(new URL('../content', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			name: 'watch-content',
			configureServer(server) {
				server.watcher.add(contentDir);
			},
		},
	],
});
