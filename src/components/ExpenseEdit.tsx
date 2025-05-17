import { getExpenseById } from '@/lib/db_helpers';
import { UUID } from 'crypto';
import { Check, CheckCircle2Icon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
type AccountExpenseProp = {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
	expId?: UUID;
};
export default function ExpenseEdit({
	isOpen,
	setIsOpen,
	expId,
}: AccountExpenseProp) {
	const [expense, setExpense] = useState<{
		name?: string;
		amount?: number;
		category_id?: UUID;
		account_id?: UUID;
		date?: Date;
	}>();
	const [selectedValue, setSelectedValue] = useState<string>('income');

	useEffect(() => {
		if (expId) {
			getExpenseById(expId).then((exp) => {
				if (exp) {
					const { id, ...rest } = exp;
					setExpense(rest);
				}
			});
		} else {
			setExpense({ date: new Date() });
		}
	}, []);
	function inputChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;
		setExpense((i) => ({
			...i,
			[name]: name === 'amount' ? Number(value) : value,
		}));
	}
	function handleToggle(value: string | undefined) {
		console.log(selectedValue);

		if (value) setSelectedValue(value);
	}
	// function handleEdit() {}
	// function handleDelete() {}
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent
				className="h-dvh w-full [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer"
				side="bottom"
			>
				<SheetHeader className="text-2xl bg-accent">
					<SheetTitle>
						<Button
							className="text-xl font-light flex justify-center items-center gap-0 hover:text-primary cursor-pointer has-[>svg]:px-0"
							variant={'ghost'}
						>
							<Check className="size-6 pt-1" />
							Save
						</Button>
					</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col justify-center items-center px-2">
					<div className="max-w-xl w-full sm:min-w-lg flex flex-col gap-4">
						<ToggleGroup
							className="w-full "
							type="single"
							value={selectedValue}
							onValueChange={handleToggle}
						>
							<ToggleGroupItem
								className="data-[state=on]:bg-primary data-[state=on]:text-white"
								value="income"
								aria-label="Toggle income"
							>
								<CheckCircle2Icon
									className={
										'size-6' +
										(selectedValue != 'income'
											? ' hidden'
											: '')
									}
								/>
								INCOME
							</ToggleGroupItem>
							<Separator orientation={'vertical'} />
							<ToggleGroupItem
								className="data-[state=on]:bg-primary data-[state=on]:text-white"
								value="expense"
								aria-label="Toggle expense"
							>
								<CheckCircle2Icon
									className={
										'size-6' +
										(selectedValue != 'expense'
											? ' hidden'
											: '')
									}
								/>
								EXPENSE
							</ToggleGroupItem>
							<Separator orientation={'vertical'} />
							<ToggleGroupItem
								className="data-[state=on]:bg-primary data-[state=on]:text-white"
								value="transfer"
								aria-label="Toggle transfer"
							>
								<CheckCircle2Icon
									className={
										'size-6' +
										(selectedValue != 'transfer'
											? ' hidden'
											: '')
									}
								/>
								TRANSFER
							</ToggleGroupItem>
						</ToggleGroup>

						<div>
							<Label className="mb-1" htmlFor="name">
								Name
							</Label>
							<Input
								type="text"
								name="name"
								value={expense?.name ?? ''}
								onChange={inputChangeHandler}
							/>
						</div>
						<div>
							<Label className="mb-1" htmlFor="amount">
								Initial Amount
							</Label>
							<Input
								className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								type="number"
								name="amount"
								value={expense?.amount ?? 0}
								onChange={inputChangeHandler}
							/>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
