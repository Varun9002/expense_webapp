import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { ReactElement } from "react";
import { CardContent } from "./ui/card";
import Currency from "./ui/currency";
import { ExpenseWithAccountCategory } from "./ExpenseList";
type ItemBoxProps = {
    date: Date | undefined;
    iconName: IconName;
    showDate?: boolean;
    grouping: "daily" | "monthly";
    children: ReactElement;
    onClick: () => void;
};
export function ExpenseItem({
    date,
    grouping,
    iconName,
    children,
    onClick,
}: // editHandler,
// id,
// deleteHandler,
ItemBoxProps) {
    return (
        <div className="w-full last-of-type:mb-20">
            {date && (
                <div className="border-b-1 border-muted-foreground text-muted-foreground text-lg font-bold p-1 ">
                    {date.toLocaleDateString(
                        "en-US",
                        grouping == "daily"
                            ? {
                                  month: "long",
                                  day: "numeric",
                              }
                            : {
                                  month: "long",
                                  year: "numeric",
                              }
                    )}
                </div>
            )}
            <CardContent className="w-full px-0" onClick={onClick}>
                <div className=" flex items-center space-x-4 p-2 px-4 hover:bg-popover ">
                    <DynamicIcon name={iconName} />
                    {children}
                </div>
            </CardContent>
        </div>
    );
}

export function RecordExpenseItem({
    expense,
}: {
    expense: ExpenseWithAccountCategory;
}) {
    return (
        <>
            <div className="flex-1 space-y-1">
                <p className="text-md font-medium text-foreground">
                    {expense.type === "transfer"
                        ? "Transfer"
                        : expense.category.name}
                </p>
                <p className=" flex gap-2 text-sm text-muted-foreground">
                    {expense.type === "transfer"
                        ? expense.category.name
                        : expense.account.name}
                </p>
            </div>
            <p className="text-md">
                <Currency
                    value={expense.amount}
                    type={expense.type}
                    visibleSign={true}></Currency>
            </p>
        </>
    );
}

export function AccountExpenseItem({
    expense,
}: {
    expense: ExpenseWithAccountCategory;
}) {
    return (
        <>
            <div className="flex-1 space-y-1">
                <p className="text-md font-medium text-foreground">
                    {expense.category.name}
                </p>
            </div>
            <p className="text-md">
                <Currency
                    value={expense.amount}
                    type={expense.type}
                    visibleSign={true}
                    transferOut={
                        expense.account.id === expense.account_id
                    }></Currency>
            </p>
            <p className="text-sm font-bold text-muted-foreground">
                {expense.date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </>
    );
}

export function CategoryExpenseItem({
    expense,
}: {
    expense: ExpenseWithAccountCategory;
}) {
    return (
        <>
            <div className="flex grow">
                <p className=" font-bold text-foreground text-md">
                    {expense.date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <p className=" font-bold text-muted-foreground text-md ml-3">
                    {expense.date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </p>
                <p className="text-md font-bold text-primary ml-3">
                    {expense.account.name}
                </p>
            </div>
            <p className="text-md">
                <Currency
                    value={expense.amount}
                    type={expense.type}
                    visibleSign={true}></Currency>
            </p>
        </>
    );
}
