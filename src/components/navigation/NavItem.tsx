import { JSX } from 'react';
import { NavLink } from 'react-router';
import { Button } from '../ui/button';

interface NavItemProps {
	name: string;
	icon: JSX.Element;
	link: string;
}
export default function NavItem({ name, icon, link }: NavItemProps) {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				'grow' + (isActive ? ' bg-secondary' : '')
			}
		>
			<Button
				variant={'ghost'}
				className="pt-3 pb-3 h-full w-full cursor-pointer rounded-none "
			>
				<div className="flex flex-col justify-center items-center">
					<span>{icon}</span>
					<p className="text-xs">{name}</p>
				</div>
			</Button>
		</NavLink>
	);
}
