import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpenseItem } from "@/components/ExpenseItem";
import { Account, Category, Expense } from "@/lib/db_schema";

export type ExpenseWithAccountCategory = Expense & {
    account: Account;
    category: Category;
};

interface ExpenseListProps {
    exp: ExpenseWithAccountCategory[];
    className?: string;
    grouping: "daily" | "monthly";
    setAddBtn?: (show: boolean) => void;
    ItemComponent: React.ComponentType<{ expense: ExpenseWithAccountCategory }>;
}

export default function ExpenseList({
    exp,
    className,
    grouping,
    setAddBtn,
    ItemComponent,
}: ExpenseListProps) {
    function isShowDate(
        expenses: ExpenseWithAccountCategory[],
        acc: ExpenseWithAccountCategory,
        i: number
    ) {
        if (grouping == "monthly") {
            return (
                i == 0 ||
                acc.date.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                }) !=
                    expenses[i - 1].date.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })
            );
        }
        if (grouping == "daily") {
            return (
                i === 0 ||
                acc.date.toLocaleDateString() !==
                    exp[i - 1].date.toLocaleDateString()
            );
        }
        return false; // Default case, should not happen
    }
    return (
        <ScrollArea
            className={className}
            onScrollEndCapture={(e) => {
                if (setAddBtn)
                    // Show the add button only when scrolled to the top
                    setAddBtn((e.target as HTMLDivElement).scrollTop == 0);
            }}>
            <div className="flex flex-col justify-center items-center mt-4 ">
                <div className="max-w-xl w-full sm:min-w-lg flex flex-col ">
                    {exp.map((acc, i) => (
                        <ExpenseItem
                            date={
                                isShowDate(exp, acc, i) ? acc.date : undefined
                            }
                            iconName={acc.category.symbol}
                            key={acc.id}
                            grouping={grouping}
                            onClick={() => {}}>
                            <ItemComponent expense={acc} />
                        </ExpenseItem>
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
}
