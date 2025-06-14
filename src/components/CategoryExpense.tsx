import { getExpensesByCategory } from "@/lib/db_helpers";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { CategoryExpenseItem } from "./ExpenseItem";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import ExpenseList, { ExpenseWithAccountCategory } from "./ExpenseList";

type CategoryExpenseProp = {
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
    categoryId: UUID;
};
export default function CategoryExpense({
    isOpen,
    setIsOpen,
    categoryId,
}: CategoryExpenseProp) {
    const [expenses, setExpenses] = useState<ExpenseWithAccountCategory[]>([]);

    useEffect(() => {
        getExpensesByCategory(categoryId).then((exp) => {
            setExpenses(exp);
        });
    }, [categoryId]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent
                className="h-dvh w-full [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer"
                side="bottom">
                <SheetHeader className="text-2xl bg-accent">
                    <SheetTitle>Category Expenses</SheetTitle>
                </SheetHeader>

                <div className="overflow-y-hidden">
                    <ExpenseList
                        exp={expenses}
                        grouping="monthly"
                        className="h-full pb-18 w-full"
                        ItemComponent={CategoryExpenseItem}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}
