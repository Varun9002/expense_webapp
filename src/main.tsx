import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './index.css';
import Accounts from './pages/Accounts';
import Categories from './pages/Category';
import Records from './pages/Records';
const root = document.getElementById('root')!;
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
if (darkThemeMq.matches) {
	document.documentElement.classList.add('dark');
}

createRoot(root).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_APP_BASE_URL}>
			<Routes>
				<Route element={<App />}>
					<Route index element={<Records />} />
					<Route path="accounts" element={<Accounts />} />
					<Route path="analysis" element={<Accounts />} />
					<Route path="categories" element={<Categories />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
