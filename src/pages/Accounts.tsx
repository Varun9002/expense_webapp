import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function Accounts() {
	const expenseTotal = 82054.0;
	const incomeTotal = 118075.0;
	const allAccountTotal = incomeTotal - expenseTotal;

	return (
		<>
			<div className="sticky top-0 w-full flex justify-center z-11">
				<div className="flex flex-col w-full max-w-3xl">
					<h3 className="text-center">
						[ All Accounts{' '}
						<span
							className={
								allAccountTotal > 0
									? 'text-emerald-400'
									: 'text-red-500'
							}
						>
							{allAccountTotal.toLocaleString('en-US', {
								style: 'currency',
								currency: 'INR',
							})}
						</span>
						]
					</h3>
					<div className="flex justify-around pt-5">
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-sm">EXPENSE SO FAR</h1>
							<p className="text-sm text-red-500">
								&#8377;{' '}
								{expenseTotal.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}
							</p>
						</div>
						<Separator orientation="vertical" />
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-sm">INCOME SO FAR</h1>
							<p className="text-sm text-emerald-300">
								&#8377;{' '}
								{incomeTotal.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="overflow-y-hidden">
				<ScrollArea className="">
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
					<div className="text-9xl">Helkkl</div>
				</ScrollArea>
			</div>
		</>
	);
}
