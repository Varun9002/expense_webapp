import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Account } from '@/lib/db_schema';
import { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function AccountEdit({
	isOpen,
	setIsOpen,
	editItem,
	onSave,
}: {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
	editItem: Account;
	onSave: (acc: Account) => void;
}) {
	const [item, setItem] = useState({ ...editItem });

	function inputChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;
		setItem((i) => ({
			...i,
			[name]: name === 'intialAmount' ? Number(value) : value,
		}));
	}
	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerContent>
				<div className="max-w-2xl self-center w-full">
					<DrawerHeader>
						<DrawerTitle className="text-2xl">
							Edit Account
						</DrawerTitle>
						<DrawerDescription></DrawerDescription>
					</DrawerHeader>
					<div className="grid w-full  items-center gap-1.5 p-4">
						<Label htmlFor="name">Name</Label>
						<Input
							type="text"
							id="name"
							name="name"
							value={item.name}
							onChange={inputChangeHandler}
						/>
						<Label htmlFor="amount">Initial Amount</Label>
						<Input
							className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							type="number"
							id="amount"
							name="intialAmount"
							value={item.intialAmount}
							onChange={inputChangeHandler}
						/>
					</div>
					<DrawerFooter>
						<Button
							onClick={() => {
								onSave(item);
							}}
						>
							Submit
						</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
