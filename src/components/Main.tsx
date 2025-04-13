import { JSX } from 'react';

export default function Main({ children }: { children: JSX.Element[] }) {
	return (
		<div className="bg-background text-accent-foreground h-full w-full flex flex-col">
			<div className="bg-amber-600 text-accent-foreground h-full w-full flex grow">
				{children.slice(0, -1)}
			</div>
			{children.at(-1)}
		</div>
	);
}
