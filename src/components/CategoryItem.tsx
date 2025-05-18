import { UUID } from 'crypto';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { Button } from './ui/button';
import { CardContent } from './ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
type ItemBoxProps = {
	name: string;
	iconName: IconName;
	editHandler: (id: UUID) => void;
	deleteHandler: (id: UUID) => void;
	id: UUID;
	onClick: React.MouseEventHandler<HTMLDivElement>;
};
export function CategoryItem({
	name,
	iconName,
	editHandler,
	id,
	deleteHandler,
	onClick,
}: ItemBoxProps) {
	return (
		<>
			<CardContent className="w-full" onClick={onClick}>
				<div className=" flex items-center space-x-4 rounded-md border p-1 hover:bg-popover">
					<DynamicIcon name={iconName} />
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							{name}
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
