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
	name: string;
	amount: number;
	editHandler: (id: UUID | null) => void;
	deleteHandler: (id: UUID) => void;
	id: UUID;
	onClick: React.MouseEventHandler<HTMLDivElement>;
};
export function AccountItem({
	name,
	amount,
	editHandler,
	id,
	deleteHandler,
	onClick,
}: ItemBoxProps) {
	return (
		<>
			<CardContent className="w-full" onClick={onClick}>
				<div className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-popover">
					<Landmark />
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							{name}
						</p>
						<p className="text-sm font-medium">
							Balance: <Currency value={amount}></Currency>
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
								onClick={(event) => {
									event.stopPropagation();
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
								onClick={(event) => {
									event.stopPropagation();
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
