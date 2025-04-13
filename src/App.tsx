import Main from '@/components/Main';
import { ChartPie, NotebookPen, Tag, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';
import './App.css';
import Nav, { NavProps } from './components/navigation/Navbar';
const navitems: NavProps = {
	items: [
		{
			name: 'Records',
			icon: <NotebookPen className="size-5" />,
			link: '/',
		},
		{
			name: 'Analysis',
			icon: <ChartPie className="size-5" />,
			link: '/analysis',
		},
		{
			name: 'Accounts',
			icon: <Wallet className="size-5" />,
			link: '/accounts',
		},
		{
			name: 'Categories',
			icon: <Tag className="size-5" />,
			link: '/categories',
		},
	],
};

export default function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Main>
				<h1 className="bg-background text-4xl text-violet-500 font-bold p-3 md:pl-10 text-shadow-lg text-shadow-violet-800 font-raleway text-center md:text-left md:self-start">
					My Expense Web
				</h1>
				<Outlet />
				<Nav items={navitems.items} />
			</Main>
		</>
	);
}
