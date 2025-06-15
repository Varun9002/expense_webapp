import { getExpensesByAccount } from "@/lib/db_helpers";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { AccountExpenseItem } from "./ExpenseItem";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import ExpenseList, { ExpenseWithAccountCategory } from "./ExpenseList";

type AccountExpenseProp = {
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
    accId: UUID;
};
export default function AccountExpense({
    isOpen,
    setIsOpen,
    accId,
}: AccountExpenseProp) {
    const [expenses, setExpenses] = useState<ExpenseWithAccountCategory[]>([]);
    const [signal, setSignal] = useState(false);
    useEffect(() => {
        getExpensesByAccount(accId).then((exp) => {
            setExpenses(exp);
        });
    }, [accId, signal]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent
                className="h-dvh w-full [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer"
                side="bottom">
                <SheetHeader className="text-2xl bg-accent">
                    <SheetTitle>Acount Details</SheetTitle>
                </SheetHeader>

                <div className="overflow-y-hidden">
                    <ExpenseList
                        exp={expenses}
                        grouping="monthly"
                        className="h-full pb-18 w-full"
                        ItemComponent={AccountExpenseItem}
                        triggerRerender={setSignal}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}
