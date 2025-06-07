import { getExpensesByAccount } from '@/lib/db_helpers';
import { Category, Expense } from '@/lib/db_schema';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { AccountExpenseItem, ExpenseItem } from './ExpenseItem';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

type AccountExpenseProp = {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
	accId: UUID;
};
export default function AccountExpense({
	isOpen,
	setIsOpen,
	accId,
}: AccountExpenseProp) {
	const [expenses, setExpenses] = useState<
		(Expense & { category: Category })[]
	>([]);

	useEffect(() => {
		getExpensesByAccount(accId).then((exp) => {
			setExpenses(exp);
		});
	}, [accId]);

	function handleEdit() {}
	function handleDelete() {}
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent
				className="h-dvh w-full [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer"
				side="bottom"
			>
				<SheetHeader className="text-2xl bg-accent">
					<SheetTitle>Acount Details</SheetTitle>
				</SheetHeader>

				<div className="overflow-y-hidden">
					<ScrollArea className="h-screen pb-18 w-full">
						<div className="flex flex-col justify-center items-center mt-4 ">
							<div className="max-w-xl w-full sm:min-w-lg flex flex-col ">
								{expenses.map((acc, i) => {
									return (
										<ExpenseItem
											expense={acc}
											iconName={acc.category.symbol}
											id={acc.id}
											key={acc.id}
											editHandler={handleEdit}
											deleteHandler={handleDelete}
											grouping="monthly"
											onClick={() => {}}
											showDate={
												i == 0 ||
												acc.date.toLocaleDateString(
													'en-US',
													{
														month: 'long',
														year: 'numeric',
													}
												) !=
													expenses[
														i - 1
													].date.toLocaleDateString(
														'en-US',
														{
															month: 'long',
															year: 'numeric',
														}
													)
											}
										>
											<AccountExpenseItem
												name={acc.category.name}
												date={acc.date}
												amount={acc.amount}
											/>
										</ExpenseItem>
									);
								})}
							</div>
						</div>
					</ScrollArea>
				</div>
			</SheetContent>
		</Sheet>
	);
}
