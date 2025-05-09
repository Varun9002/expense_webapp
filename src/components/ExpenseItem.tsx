import { Account, Expense } from '@/lib/db_schema';
import { UUID } from 'crypto';
import { Archive } from 'lucide-react';
import { CardContent } from './ui/card';
import Currency from './ui/currency';
type ItemBoxProps = {
	expense: Expense & { account?: Account };
	showDate?: boolean;
	editHandler: (id: UUID | null) => void;
	deleteHandler: (id: UUID) => void;
	id: UUID;
	grouping: 'daily' | 'monthly';
};
export function ExpenseItem({
	expense,
	showDate,
	grouping,
}: // editHandler,
// id,
// deleteHandler,
ItemBoxProps) {
	return (
		<div className="w-full">
			{showDate && (
				<div className="border-b-1 border-muted-foreground text-muted-foreground text-lg font-bold p-1">
					{expense.date.toLocaleDateString(
						'en-US',
						grouping == 'daily'
							? {
									month: 'long',
									day: 'numeric',
							  }
							: {
									month: 'long',
									year: 'numeric',
							  }
					)}
				</div>
			)}
			<CardContent className="w-full px-0">
				<div className=" flex items-center space-x-4 p-2 px-4 hover:bg-popover ">
					<Archive />
					<div className="flex-1 space-y-1">
						<p className="text-md font-medium text-foreground">
							{expense.name}
						</p>
						{grouping == 'daily' && (
							<p className=" flex gap-2 text-sm text-muted-foreground">
								{expense.account?.name}
							</p>
						)}
					</div>
					<p className="text-md">
						<Currency
							value={expense.amount}
							visibleSign={true}
						></Currency>
					</p>
					{grouping == 'monthly' && (
						<p className="text-sm font-bold text-input">
							{expense.date.toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
							})}
						</p>
					)}
				</div>
			</CardContent>
		</div>
	);
}
