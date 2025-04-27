import { Expense } from '@/lib/db_schema';
import { UUID } from 'crypto';
import { Ellipsis, Landmark, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { CardContent } from './ui/card';
import Currency from './ui/currency';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
type ItemBoxProps = {
	expense: Expense;
	editHandler: (id: UUID | null) => void;
	deleteHandler: (id: UUID) => void;
	id: UUID;
};
export function ExpenseItem({
	expense,
	editHandler,
	id,
	deleteHandler,
}: ItemBoxProps) {
	return (
		<>
			<CardContent className="w-full">
				<div className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-primary-foreground ">
					<Landmark />
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							{expense.name}
						</p>
						<p className="text-sm font-medium">
							Balance:{' '}
							<Currency value={expense.amount}></Currency>
						</p>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="hover:cursor-pointer"
								variant={'ghost'}
							>
								<Ellipsis />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setTimeout(() => {
										editHandler(id);
									}, 0);
								}}
							>
								<Pencil />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								variant="destructive"
								onClick={() => {
									setTimeout(() => {
										deleteHandler(id);
									}, 0);
								}}
							>
								<Trash2 />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</>
	);
}
