import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
	base: process.env.VITE_APP_BASE_URL,
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['vite.svg'],
			manifest: {
				name: 'My Expense Web',
				short_name: 'Expense Web',
				start_url: process.env.VITE_APP_BASE_URL,
				scope: process.env.VITE_APP_BASE_URL,
				description: 'This is a PWA built with Vite and React',
				display: 'standalone',
				theme_color: '#000000',
				icons: [
					{
						src: 'icon_192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icon_512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'icon_512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
