import { JSX } from 'react';
import NavItem from './NavItem';

export interface NavProps {
	items: {
		name: string;
		icon: JSX.Element;
		link: string;
	}[];
}
export default function Nav({ items }: NavProps) {
	return (
		<div className="w-full flex justify-around fixed bottom-0 left-0 bg-background border-2">
			{items.map(({ name, icon, link }) => (
				<NavItem
					name={name}
					icon={icon}
					link={link}
					key={name}
				></NavItem>
			))}
		</div>
	);
}
