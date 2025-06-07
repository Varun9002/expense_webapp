import {
	getAccount,
	getAccountByID,
	getCategory,
	getCategoryById,
	getExpenseById,
	updateExpense,
} from '@/lib/db_helpers';
import { Account, Category, Expense } from '@/lib/db_schema';
import { cn } from '@/lib/utils';
import { UUID } from 'crypto';
import { format } from 'date-fns';
import {
	CalendarIcon,
	Check,
	CheckCircle2Icon,
	CircleAlertIcon,
} from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Calculator from './Calculator';
import ItemSelectSheet from './ItemSelectSheet';
import { TimePicker } from './TimePicker';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Card, CardContent } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Textarea } from './ui/textarea';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
type ExpenseEditProp = {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
	expId: UUID;
	onClose: () => void;
};
export default function ExpenseEdit({
	isOpen,
	setIsOpen,
	expId,
	onClose,
}: ExpenseEditProp) {
	const [allCategory, setAllCategory] = useState<Category[]>([]);
	const [allAccount, setAllAccount] = useState<Account[]>([]);
	const [category, setCategory] = useState<Category>();
	const [account1, setAccount1] = useState<Account>();
	const [account2, setAccount2] = useState<Account>();
	const [selectOpen1, setselectOpen1] = useState<boolean>(false);
	const [selectOpen2, setselectOpen2] = useState<boolean>(false);
	const [selectOpen3, setselectOpen3] = useState<boolean>(false);
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [note, setNote] = useState('');
	const [selectedValue, setSelectedValue] = useState<string>('income');
	const [calAmount, setCalAmount] = useState<number>(0);

	useEffect(() => {
		getExpenseById(expId)
			.then((exp) => {
				if (exp) {
					const { id, ...rest } = exp;
					setCalAmount(rest.amount);
					setDate(rest.date);
					setNote(rest.note);
					return Promise.all([
						getCategoryById(rest.category_id),
						getAccountByID(rest.account_id),
					]);
				}
			})
			.then((res) => {
				if (res) {
					const [cat, acc] = res;
					if (cat) setCategory(cat);
					if (acc) setAccount1(acc);
				}
			});
		getAccount().then((acc) => {
			setAllAccount(acc);
		});
		getCategory().then((cat) => {
			setAllCategory(cat);
		});
	}, [expId]);
	function inputChangeHandler(event: ChangeEvent<HTMLTextAreaElement>): void {
		setNote(event.target.value);
	}
	function handleToggle(value: string | undefined) {
		if (value) setSelectedValue(value);
	}
	function handleSave() {
		let exp: Expense | undefined;

		if (!account1) {
			toast(
				`Please select an Account ${
					selectedValue == 'transfer' ? 'to Transfer from.' : '.'
				}`
			);
		} else if (selectedValue === 'transfer' && !account2) {
			toast('Please select Account to Transfer to.');
		} else if (selectedValue != 'transfer' && !category) {
			toast('Please select Category');
		} else if (note === '') {
			toast('Please Fill Note');
		} else if (calAmount === 0) {
			toast('Please add amount');
		} else if (!date) {
			toast('Please Select Date');
		} else {
			if (selectedValue === 'transfer' && account2) {
				exp = {
					id: expId,
					account_id: account1.id,
					category_id: account2.id,
					amount: calAmount,
					date: date,
					note: note,
				};
			} else if (selectedValue !== 'transfer' && category) {
				exp = {
					id: expId,
					account_id: account1.id,
					category_id: category.id,
					amount: calAmount,
					date: date,
					note: note,
				};
			} else {
				toast('Unexpected error encountered', {
					description: 'Something went wrong with common acc/cat_id',
					action: {
						label: 'Close',
						onClick: () => {},
					},
					icon: <CircleAlertIcon />,
					duration: 10000,
					className: 'text-destructive!',
				});
			}
		}
		if (exp) {
			updateExpense(exp).then(() => {
				setIsOpen(false);
				setTimeout(onClose, 100);
			});
		}
	}
	// function handleDelete() {}
	return (
		<Sheet
			open={isOpen}
			onOpenChange={(b: boolean) => {
				setIsOpen(b);
				if (!b) {
					setTimeout(onClose, 100);
				}
			}}
		>
			<SheetContent
				className="h-dvh w-full [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer"
				side="bottom"
			>
				<SheetHeader className="text-2xl bg-accent">
					<SheetTitle>
						<Button
							className="text-xl font-light flex justify-center items-center gap-0 hover:text-primary cursor-pointer has-[>svg]:px-0"
							variant={'ghost'}
							onClick={handleSave}
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
								className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
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
								className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
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
								className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
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

						<div className="flex justify-between items-center gap-2">
							<ItemSelectSheet
								icon="wallet"
								triggerName={
									account1 ? account1.name : 'Account'
								}
								isOpen={selectOpen1}
								setIsOpen={setselectOpen1}
							>
								{allAccount.map((a) => {
									return (
										<Card
											className="cursor-pointer active:bg-primary"
											onClick={() => {
												if (
													selectedValue ===
														'transfer' &&
													account2 &&
													account2.id === a.id
												) {
													toast(
														'Choose 2 different account for transfer'
													);
												} else {
													setAccount1(a);
												}
												setselectOpen1(false);
											}}
										>
											<CardContent>
												<p key={a.id}>{a.name}</p>
											</CardContent>
										</Card>
									);
								})}
							</ItemSelectSheet>
							{selectedValue === 'transfer' ? (
								<ItemSelectSheet
									icon="wallet"
									triggerName={
										account2 ? account2.name : 'Account'
									}
									isOpen={selectOpen2}
									setIsOpen={setselectOpen2}
								>
									{allAccount.map((a) => {
										return (
											<Card
												className="cursor-pointer active:bg-primary"
												onClick={() => {
													if (
														selectedValue ===
															'transfer' &&
														account1 &&
														account1.id === a.id
													) {
														toast(
															'Choose 2 different account for transfer'
														);
													} else {
														setAccount2(a);
													}
													setselectOpen2(false);
												}}
											>
												<CardContent>
													<p key={a.id}>{a.name}</p>
												</CardContent>
											</Card>
										);
									})}
								</ItemSelectSheet>
							) : (
								<ItemSelectSheet
									icon={category ? category.symbol : 'tag'}
									triggerName={
										category ? category.name : 'Category'
									}
									isOpen={selectOpen3}
									setIsOpen={setselectOpen3}
								>
									{allCategory.map((a) => {
										return (
											<Card
												className="cursor-pointer active:bg-primary"
												onClick={() => {
													setCategory(a);
													setselectOpen3(false);
												}}
											>
												<CardContent>
													<div
														className="flex flex-col justify-center items-center"
														key={a.id}
													>
														<DynamicIcon
															name={a.symbol}
														/>
														<p>{a.name}</p>
													</div>
												</CardContent>
											</Card>
										);
									})}
								</ItemSelectSheet>
							)}
						</div>
						<Textarea
							className="text-lg! h-50 max-sm:h-30 resize-none"
							placeholder="Note"
							value={note}
							onInput={inputChangeHandler}
							rows={9}
						></Textarea>
						<Calculator value={calAmount} setValue={setCalAmount} />
						<div className="flex items-end gap-4 justify-center">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'basis-1/2 justify-start text-left font-normal',
											!date && 'text-muted-foreground'
										)}
									>
										<CalendarIcon />
										{date ? (
											format(date, 'PPP')
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0 z-50 pointer-events-auto"
									align="start"
								>
									<Calendar
										mode="single"
										navLayout="after"
										fixedWeeks
										showOutsideDays={false}
										selected={date}
										onSelect={(d: Date | undefined) => {
											if (d && date) {
												d.setHours(date.getHours());
												d.setMinutes(date.getMinutes());
											}
											setDate(d);
										}}
									/>
								</PopoverContent>
							</Popover>
							<TimePicker date={date} setDate={setDate} />
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
