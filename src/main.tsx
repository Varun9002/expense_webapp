import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './index.css';
import Accounts from './pages/Accounts';
// import Records from './pages/Records';
const root = document.getElementById('root')!;
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
if (darkThemeMq.matches) {
	root.className = root.className + 'dark';
}

createRoot(root).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route index element={<Accounts />} />
					<Route path="accounts" element={<Accounts />} />
					<Route path="analysis" element={<Accounts />} />
					<Route path="categories" element={<Accounts />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
