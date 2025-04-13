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
		<div className="w-full bg-auto flex justify-around">
			{items.map(({ name, icon, link }, index) => (
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
