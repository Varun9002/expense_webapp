import { Account, Expense } from '@/lib/db_schema';
import { UUID } from 'crypto';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { ReactElement } from 'react';
import { CardContent } from './ui/card';
import Currency from './ui/currency';
type ItemBoxProps = {
	expense: Expense & { account?: Account };
	iconName: IconName;
	showDate?: boolean;
	editHandler: (id: UUID | null) => void;
	deleteHandler: (id: UUID) => void;
	id: UUID;
	grouping: 'daily' | 'monthly';
	children: ReactElement;
	onClick: () => void;
};
export function ExpenseItem({
	expense,
	showDate,
	grouping,
	iconName,
	children,
	onClick,
}: // editHandler,
// id,
// deleteHandler,
ItemBoxProps) {
	return (
		<div className="w-full last-of-type:mb-20">
			{showDate && (
				<div className="border-b-1 border-muted-foreground text-muted-foreground text-lg font-bold p-1 ">
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
			<CardContent className="w-full px-0" onClick={onClick}>
				<div className=" flex items-center space-x-4 p-2 px-4 hover:bg-popover ">
					<DynamicIcon name={iconName} />
					{children}
				</div>
			</CardContent>
		</div>
	);
}

export function RecordExpenseItem({
	name,
	accName,
	amount,
}: {
	name: string;
	accName: string;
	amount: number;
}) {
	return (
		<>
			<div className="flex-1 space-y-1">
				<p className="text-md font-medium text-foreground">{name}</p>
				<p className=" flex gap-2 text-sm text-muted-foreground">
					{accName}
				</p>
			</div>
			<p className="text-md">
				<Currency value={amount} visibleSign={true}></Currency>
			</p>
		</>
	);
}

export function AccountExpenseItem({
	name,
	date,
	amount,
}: {
	name: string;
	date: Date;
	amount: number;
}) {
	return (
		<>
			<div className="flex-1 space-y-1">
				<p className="text-md font-medium text-foreground">{name}</p>
			</div>
			<p className="text-md">
				<Currency value={amount} visibleSign={true}></Currency>
			</p>
			<p className="text-sm font-bold text-input">
				{date.toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
				})}
			</p>
		</>
	);
}

export function CategoryExpenseItem({
	name,
	date,
	amount,
}: {
	name: string;
	date: Date;
	amount: number;
}) {
	return (
		<>
			<div className="flex grow">
				<p className=" font-bold text-foreground text-md">
					{date.toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
					})}
				</p>
				<p className="text-md font-bold text-primary ml-3">{name}</p>
			</div>
			<p className="text-md">
				<Currency value={amount} visibleSign={true}></Currency>
			</p>
		</>
	);
}
