import { JSX } from 'react';
export default function Main({ children }: { children: JSX.Element[] }) {
	return (
		<>
			<div className="text-accent-foreground h-screen w-full flex flex-col">
				<main className="text-accent-foreground h-screen w-full flex flex-col items-center grow relative">
					{children.slice(0, -1)}
				</main>
				{children.at(-1)}
			</div>
		</>
	);
}
