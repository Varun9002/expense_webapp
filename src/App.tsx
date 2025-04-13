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
		<Main>
			<Outlet />
			<Nav items={navitems.items} />
		</Main>
	);
}
