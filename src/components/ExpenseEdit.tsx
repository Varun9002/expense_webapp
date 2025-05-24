import {
    getAccountByID,
    getCategoryById,
    getExpenseById,
} from "@/lib/db_helpers";
import { UUID } from "crypto";
import { CalendarIcon, Check, CheckCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import ItemSelectSheet from "./ItemSelectSheet";
import { Textarea } from "./ui/textarea";
import Calculator from "./Calculator";
import { Account, Category } from "@/lib/db_schema";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
type ExpenseEditProp = {
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
    expId?: UUID;
};
export default function ExpenseEdit({
    isOpen,
    setIsOpen,
    expId,
}: ExpenseEditProp) {
    const [expense, setExpense] = useState<{
        amount: number;
        note: string;
        category_id?: UUID;
        account_id?: UUID;
        date?: Date;
    }>();
    const [category, setCategory] = useState<Category>();
    const [account, setAccount] = useState<Account>();
    const [date, setDate] = useState<Date>();
    useEffect(() => {
        if (expId) {
            getExpenseById(expId)
                .then((exp) => {
                    if (exp) {
                        const { id, ...rest } = exp;
                        setCalAmount(rest.amount);
                        setDate(rest.date);
                        setExpense(rest);
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
                        if (acc) setAccount(acc);
                    }
                });
        } else {
            // setExpense({name: date: new Date() });
        }
    }, []);

    const [selectedValue, setSelectedValue] = useState<string>("income");
    const [calAmount, setCalAmount] = useState<number>(0);

    // function inputChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    //     const { name, value } = event.target;
    //     setExpense((i) => ({
    //         ...i,
    //         [name]: name === "amount" ? Number(value) : value,
    //     }));
    // }
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
                side="bottom">
                <SheetHeader className="text-2xl bg-accent">
                    <SheetTitle>
                        <Button
                            className="text-xl font-light flex justify-center items-center gap-0 hover:text-primary cursor-pointer has-[>svg]:px-0"
                            variant={"ghost"}>
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
                            onValueChange={handleToggle}>
                            <ToggleGroupItem
                                className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
                                value="income"
                                aria-label="Toggle income">
                                <CheckCircle2Icon
                                    className={
                                        "size-6" +
                                        (selectedValue != "income"
                                            ? " hidden"
                                            : "")
                                    }
                                />
                                INCOME
                            </ToggleGroupItem>
                            <Separator orientation={"vertical"} />
                            <ToggleGroupItem
                                className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
                                value="expense"
                                aria-label="Toggle expense">
                                <CheckCircle2Icon
                                    className={
                                        "size-6" +
                                        (selectedValue != "expense"
                                            ? " hidden"
                                            : "")
                                    }
                                />
                                EXPENSE
                            </ToggleGroupItem>
                            <Separator orientation={"vertical"} />
                            <ToggleGroupItem
                                className="data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
                                value="transfer"
                                aria-label="Toggle transfer">
                                <CheckCircle2Icon
                                    className={
                                        "size-6" +
                                        (selectedValue != "transfer"
                                            ? " hidden"
                                            : "")
                                    }
                                />
                                TRANSFER
                            </ToggleGroupItem>
                        </ToggleGroup>

                        <div className="flex justify-between items-center gap-2">
                            <ItemSelectSheet
                                icon="wallet"
                                triggerName={
                                    account ? account.name : "Account"
                                }>
                                <p>asd</p>
                                <p>asd</p>
                            </ItemSelectSheet>
                            {selectedValue === "transfer" ? (
                                <ItemSelectSheet
                                    icon="wallet"
                                    triggerName="Account">
                                    <p>asd</p>
                                    <p>asd</p>
                                </ItemSelectSheet>
                            ) : (
                                <ItemSelectSheet
                                    icon={category ? category.symbol : "tag"}
                                    triggerName={
                                        category ? category.name : "Category"
                                    }>
                                    <p>asd</p>
                                    <p>asd</p>
                                </ItemSelectSheet>
                            )}
                        </div>
                        <Textarea
                            className="text-lg! h-50 max-sm:h-30 resize-none"
                            placeholder="Note"
                            value={expense?.note}
                            rows={9}></Textarea>
                        <Calculator value={calAmount} setValue={setCalAmount} />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}>
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0 z-50 pointer-events-auto"
                                align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
