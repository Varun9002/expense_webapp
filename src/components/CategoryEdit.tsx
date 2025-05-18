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
import { Category } from '@/lib/db_schema';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

const initsyms: IconName[] = [
	'ban',
	'utensils-crossed',
	'shirt',
	'handshake',
	'shopping-basket',
	'credit-card',
	'graduation-cap',
	'wallet',
];

export function CategoryEdit({
	isOpen,
	setIsOpen,
	editItem,
	onSave,
}: {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
	editItem: Category;
	onSave: (acc: Category) => void;
}) {
	const [item, setItem] = useState({ ...editItem });
	const [syms, setSyms] = useState(initsyms);
	const [newSym, setNewSym] = useState('');

	function inputChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;
		if (name == 'icon') {
			console.log(iconNames.includes(value as IconName));

			setNewSym(value);
		}
		setItem((i) => ({
			...i,
			[name]: name === 'intialAmount' ? Number(value) : value,
		}));
	}
	function handleToggle(sym: string): void {
		setItem({ ...item, symbol: sym as IconName });
	}
	function addNewIcon() {
		if (iconNames.includes(newSym as IconName)) {
			setSyms([...syms, newSym as IconName]);
		} else {
			toast('Provided value is not a icon');
		}
		setNewSym('');
	}

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerContent>
				<div className="max-w-2xl self-center w-full">
					<DrawerHeader>
						<DrawerTitle className="text-2xl">
							Edit Category
						</DrawerTitle>
						<DrawerDescription></DrawerDescription>
					</DrawerHeader>
					<div className="grid w-full items-center gap-1.5 p-4">
						<Label htmlFor="name">Name</Label>
						<Input
							type="text"
							id="name"
							name="name"
							value={item.name}
							onChange={inputChangeHandler}
						/>
						<h1 className="justify-self-center text-xl mt-3">
							Icons
						</h1>

						<ToggleGroup
							className="flex-wrap gap-x-6 gap-y-2 justify-center items-center justify-self-center"
							type="single"
							value={item.symbol}
							onValueChange={handleToggle}
						>
							{syms.map((sym) => (
								<ToggleGroupItem
									value={sym}
									key={sym}
									className="size-12 data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer !rounded-2xl border-2 border-input shadow-lg shadow-input grow-0 shrink-0 basis-12"
								>
									<DynamicIcon
										name={sym}
										className="size-8"
									/>
								</ToggleGroupItem>
							))}
						</ToggleGroup>
						<h1 className="justify-self-center text-xl mt-3">
							Or Add new
						</h1>
						<div className="flex w-full gap-3 items-end">
							<div className="grow">
								<Label htmlFor="icon">Icon</Label>
								<Input
									type="text"
									id="icon"
									name="icon"
									value={newSym}
									onChange={inputChangeHandler}
								/>
							</div>
							<DynamicIcon
								name={
									(iconNames.includes(newSym as IconName)
										? newSym
										: 'dot') as IconName
								}
								className="size-8 mb-1"
							/>
							<Button variant={'secondary'} onClick={addNewIcon}>
								Ok
							</Button>
						</div>
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
