import { Pencil, Trash2 } from "lucide-react";
import { ExpenseWithAccountCategory } from "./ExpenseList";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DynamicIcon } from "lucide-react/dynamic";
import { UUID } from "crypto";

type ExpenseSelectProp = {
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
    expense: ExpenseWithAccountCategory;
    onEdit: () => void;
    onDelete: (id: UUID) => void;
};

export default function ExpenseSelect({
    isOpen,
    setIsOpen,
    expense,
    onEdit,
    onDelete,
}: ExpenseSelectProp) {
    const colMap = {
        income: "bg-green-500",
        expense: "bg-red-400",
        transfer: "bg-blue-400",
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-accent pt-0 px-0 [&>button:last-of-type>svg]:size-8 [&>button]:cursor-pointer [&>button]:left-4 [&>button]:right-auto [&>button]:opacity-100 [&>button]:hover:bg-white/10">
                <DialogHeader
                    className={
                        "p-4 rounded-lg rounded-b-none " +
                        colMap[
                            expense.type as "income" | "expense" | "transfer"
                        ]
                    }>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-end gap-5">
                            <Button
                                className="cursor-pointer dark:hover:bg-white/10"
                                variant={"ghost"}
                                onClick={() => {
                                    if (confirm("Are you sure?"))
                                        onDelete(expense.id);
                                }}>
                                <Trash2 className="size-5" />
                            </Button>
                            <Button
                                className="cursor-pointer dark:hover:bg-white/10"
                                variant={"ghost"}
                                onClick={onEdit}>
                                <Pencil className="size-5" />
                            </Button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-lg font-bold">
                                {expense.type.toUpperCase()}
                            </p>
                            <p className="text-2xl tracking-widest font-bold">
                                {(expense.type === "expense"
                                    ? -expense.amount
                                    : expense.amount
                                ).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </p>
                            <p className="text-md mt-3 self-end">
                                {expense.date
                                    .toLocaleString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                    })
                                    .replace(",", "")}
                            </p>
                        </div>
                    </div>
                </DialogHeader>
                <div className="flex flex-col justify-center gap-2 px-4">
                    <div className="flex items-center">
                        <p className="text-lg w-18">
                            {expense.type === "transfer" ? "From" : "Account"}
                        </p>
                        <p className="ml-3 p-2 outline-1 outline-muted-foreground rounded-lg">
                            {expense.account.name}
                        </p>
                    </div>
                    {expense.type === "transfer" ? (
                        <div className="flex items-center">
                            <p className="text-lg w-18">To </p>
                            <div className="ml-3 p-2 outline-1 outline-muted-foreground rounded-lg flex gap-2">
                                {expense.category.name
                                    .split(">")[1]
                                    .slice(undefined, -1)}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <p className="text-lg w-18">Category </p>
                            <div className="ml-3 p-2 outline-1 outline-muted-foreground rounded-lg flex gap-2">
                                <DynamicIcon name={expense.category.symbol} />
                                {expense.category.name}
                            </div>
                        </div>
                    )}
                    <div className="flex items-center justify-center p-2">
                        <p className="text-muted-foreground">{expense.note}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
