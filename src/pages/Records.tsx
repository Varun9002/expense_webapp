import { ExpenseItem } from '@/components/ExpenseItem';
import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import { MonthPicker } from '@/components/ui/monthpicker';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { format } from 'date-fns/format';
import { AnimatePresence, motion } from 'framer-motion';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { clearExpense, getExpensesByMonth } from '@/lib/db_helpers';
import { Account, Expense } from '@/lib/db_schema';
import { cn } from '@/lib/utils';
import { UUID } from 'crypto';
import { CalendarIcon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Records() {
	const [incomeTotal, setIncomeTotal] = useState(0);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [date, setDate] = useState(new Date());
	const [addBtn, setAddBtn] = useState(true);
	const [exp, setExp] = useState<(Expense & { account: Account })[]>([]);

	useEffect(() => {
		clearExpense().then(() => {});
		getExpensesByMonth(date).then((ex) => {
			setExp(ex);
			const { spent, earn } = ex.reduce(
				(acc, e) =>
					e.amount > 0
						? { ...acc, earn: acc.earn + e.amount }
						: { ...acc, spent: acc.spent - e.amount },
				{ spent: 0, earn: 0 }
			);
			setIncomeTotal(earn);
			setExpenseTotal(spent);
		});
	}, [date]);

	const handleNextMonth = () => {
		const nextMonth = new Date(date);
		nextMonth.setMonth(date.getMonth() + 1);
		setDate(nextMonth);
	};

	const handlePreviousMonth = () => {
		const prevMonth = new Date(date);
		prevMonth.setMonth(date.getMonth() - 1);
		setDate(prevMonth);
	};
	function handleEdit(id: UUID | null) {
		console.log(id);
		// const filterAcc = exp.filter((acc) => {
		// 	return acc.id === id;
		// });
		// if (filterAcc.length > 0) {
		// 	setEditItem(filterAcc[0]);
		// 	setIsEditOpen(true);
		// } else {
		// 	setEditItem(null);
		// 	setIsEditOpen(false);
		// }
	}
	async function handleDelete(id: UUID) {
		console.log(id);

		// await deleteAccount(id);
		// const filtetAcc = await getAccount();
		// setAccounts(filtetAcc);
	}
	// function handleNewClick() {}
	return (
		<>
			<div className="w-full flex justify-center z-11 mt-5 pb-2 border-b-2 shadow-md shadow-accent">
				<div className="flex flex-col w-full max-w-3xl">
					<Pagination className="">
						<PaginationContent className="grow justify-around">
							<PaginationItem onClick={handlePreviousMonth}>
								<PaginationPrevious
									href="#"
									className="text-md"
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#" className="w-30">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={'ghost'}
												className={cn(
													'w-full justify-start text-left font-normal cursor-pointer text-md',
													!date &&
														'text-muted-foreground'
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{date ? (
													format(date, 'MMM yyyy')
												) : (
													<span>Pick a month</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<MonthPicker
												onMonthSelect={setDate}
												selectedMonth={date}
											/>
										</PopoverContent>
									</Popover>
								</PaginationLink>
							</PaginationItem>
							<PaginationItem onClick={handleNextMonth}>
								<PaginationNext href="#" className="text-md" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
					<div className="flex justify-around pt-5">
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-sm">EXPENSE</h1>
							<Currency value={-expenseTotal}></Currency>
						</div>
						<Separator orientation={'vertical'} />
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-sm">INCOME</h1>
							<Currency value={incomeTotal}></Currency>
						</div>
					</div>
				</div>
			</div>
			<div className="overflow-y-hidden h-full w-full ">
				<ScrollArea
					className="h-full pb-18 w-full"
					onScrollEndCapture={(e) => {
						setAddBtn((e.target as HTMLDivElement).scrollTop == 0);
					}}
				>
					<div className="flex flex-col justify-center items-center mt-4 ">
						<div className="max-w-xl w-full sm:min-w-lg flex flex-col ">
							{exp.map((acc, i) => {
								return (
									<ExpenseItem
										expense={acc}
										id={acc.id}
										key={acc.id}
										editHandler={handleEdit}
										deleteHandler={handleDelete}
										showDate={
											i > 0
												? acc.date.toLocaleDateString() !=
												  exp[
														i - 1
												  ].date.toLocaleDateString()
												: true
										}
									/>
								);
							})}
						</div>
					</div>
				</ScrollArea>
			</div>
			<AnimatePresence>
				{addBtn && (
					<motion.div
						className="fixed bottom-20 right-4 z-20"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ duration: 0.1 }}
					>
						<Button
							variant="default"
							className="size-16 rounded-full"
						>
							<Plus className="size-10" strokeWidth={4} />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
