import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { contentPlugin } from './scripts/content-plugin.ts';

export default defineConfig({
	plugins: [react(), contentPlugin()],
});
