import { ExpenseItem } from '@/components/ExpenseItem';
import Currency from '@/components/ui/currency';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Expense } from '@/lib/db_schema';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { UUID } from 'crypto';
import { useState } from 'react';
const exp: Expense[] = [
	{
		id: '5fd0857c-6181-494f-bd2c-b69126d175b8',
		name: 'Exp1',
		amount: 22.2,
		category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
		account_id: '5fd0857c-6181-494f-bd2c-b69126d175b2',
		date: new Date(),
	},
	{
		id: '5fd0857c-6181-494f-bd2c-b69126d175a2',
		name: 'Exp1',
		amount: 42.2,
		category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
		account_id: '5fd0857c-6181-494f-bd2c-b69126d175b2',
		date: new Date(),
	},
];
export default function Records() {
	const incomeTotal = 0;
	const expenseTotal = 0;
	const [date, setDate] = useState(new Date());
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
		// await deleteAccount(id);
		// const filtetAcc = await getAccount();
		// setAccounts(filtetAcc);
	}
	return (
		<>
			<div className="w-full flex justify-center z-11 mt-5">
				<div className="flex flex-col w-full max-w-3xl">
					<Pagination className="grow">
						<PaginationContent className="grow justify-around">
							<PaginationItem onClick={handlePreviousMonth}>
								<PaginationPrevious
									href="#"
									className="text-lg"
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href="#"
									className="w-30 text-lg"
								>
									{date.toLocaleDateString('en-US', {
										month: 'long',
									})}
									,{' '}
									{date.toLocaleDateString('en-US', {
										year: 'numeric',
									})}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem onClick={handleNextMonth}>
								<PaginationNext href="#" className="text-lg" />
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
			<div className="overflow-y-hidden w-full ">
				<ScrollArea className="h-full pb-14 w-full">
					<div className="flex flex-col justify-center items-center mt-12 ">
						<div className="max-w-xl w-full sm:min-w-lg flex flex-col gap-4">
							{exp.map((acc) => {
								return (
									<ExpenseItem
										expense={acc}
										id={acc.id}
										key={acc.id}
										editHandler={handleEdit}
										deleteHandler={handleDelete}
									/>
								);
							})}
						</div>
						{/* <Button className="my-10" onClick={handleNewClick}>
							<SquarePlus /> New Account
						</Button> */}
					</div>
				</ScrollArea>
			</div>
		</>
	);
}
