import { getExpensesByAccount } from '@/lib/db_helpers';
import { Expense } from '@/lib/db_schema';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { ExpenseItem } from './ExpenseItem';
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
	const [expenses, setExpenses] = useState<Expense[]>([]);

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
				className="h-svh w-full [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer"
				side="bottom"
			>
				<SheetHeader>
					<SheetTitle className="text-2xl">Acount Details</SheetTitle>
				</SheetHeader>

				<div className="overflow-y-hidden">
					<ScrollArea className="h-screen pb-18 w-full">
						<div className="flex flex-col justify-center items-center mt-4 ">
							<div className="max-w-xl w-full sm:min-w-lg flex flex-col ">
								{expenses.map((acc, i) => {
									return (
										<ExpenseItem
											expense={acc}
											id={acc.id}
											key={acc.id}
											editHandler={handleEdit}
											deleteHandler={handleDelete}
											grouping="monthly"
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
										/>
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
