import { JSX } from 'react';

export default function Main({ children }: { children: JSX.Element[] }) {
	return (
		<div className="bg-background text-accent-foreground h-screen w-full flex flex-col">
			<main className="bg-background text-accent-foreground w-full flex flex-col items-center grow border-b-4">
				{children.slice(0, -1)}
			</main>
			{children.at(-1)}
		</div>
	);
}
