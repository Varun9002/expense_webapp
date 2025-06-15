import { CategoryEdit } from "@/components/CategoryEdit";
import CategoryExpense from "@/components/CategoryExpense";
import { CategoryItem } from "@/components/CategoryItem";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    clearCategory,
    deleteCategory,
    getCategory,
    getExpenseStatus,
    newCategory,
    updateCategory,
} from "@/lib/db_helpers";
import { Category } from "@/lib/db_schema";
import { UUID } from "crypto";
import { CircleAlertIcon, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Categories() {
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const allAccountTotal = incomeTotal - expenseTotal;
    const [categories, setCategories] = useState<Category[]>([]);
    const [isExpenseView, setIsExpenseView] = useState(false);
    const [editItem, setEditItem] = useState<Category | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedAccId, setSelectedAccId] = useState<UUID | null>(null);

    useEffect(() => {
        clearCategory()
            .then(() => getCategory())
            .then((cat) => {
                setCategories(cat);
                return getExpenseStatus();
            })
            .then(({ earn, spent }) => {
                setExpenseTotal(spent);
                setIncomeTotal(earn);
            });
    }, []);

    async function onEditSave(updCategory: Category) {
        await updateCategory(updCategory);
        const filtetAcc = await getCategory();
        setCategories(filtetAcc);
        handleIsEditOpen(false);
    }
    function handleEdit(id: UUID) {
        const filterAcc = categories.filter((acc) => {
            return acc.id === id;
        });
        if (filterAcc.length > 0) {
            setEditItem(filterAcc[0]);
            setIsEditOpen(true);
        } else {
            toast("Unexpected error encountered", {
                description: "Cannot find selected Category",
                action: {
                    label: "Close",
                    onClick: () => {},
                },
                icon: <CircleAlertIcon />,
                duration: 10000,
                className: "text-destructive!",
            });
        }
    }
    async function handleDelete(id: UUID) {
        await deleteCategory(id);
        const filtetAcc = await getCategory();
        setCategories(filtetAcc);
    }
    function handleIsEditOpen(b: boolean) {
        if (b) {
            setEditItem(editItem);
            setIsEditOpen(true);
        } else {
            setEditItem(null);
            setIsEditOpen(false);
        }
    }
    async function handleNewClick() {
        const acc = newCategory();
        setEditItem(acc);
        setIsEditOpen(true);
    }
    return (
        <>
            <div className="w-full flex justify-center z-11 mt-5 ">
                <div className="flex flex-col w-full max-w-3xl">
                    <h3 className="text-center">
                        [ All Accounts{" "}
                        <Currency type="auto" value={allAccountTotal} />]
                    </h3>
                    <div className="flex justify-around pt-5">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-sm">EXPENSE SO FAR</h1>
                            <Currency
                                type="expense"
                                value={expenseTotal}></Currency>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-sm">INCOME SO FAR</h1>
                            <Currency
                                type="income"
                                value={incomeTotal}></Currency>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-y-hidden w-full ">
                <ScrollArea className="h-full pb-14 w-full">
                    <div className="flex flex-col justify-center items-center mt-12 ">
                        <div className="max-w-xl w-full sm:min-w-lg flex flex-col gap-4">
                            {categories.map((acc) => {
                                return (
                                    <CategoryItem
                                        name={acc.name}
                                        iconName={acc.symbol}
                                        id={acc.id}
                                        key={acc.id}
                                        editHandler={handleEdit}
                                        deleteHandler={handleDelete}
                                        onClick={() => {
                                            setIsExpenseView(true);
                                            setSelectedAccId(acc.id);
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <Button
                            className="my-10 cursor-pointer"
                            onClick={handleNewClick}>
                            <SquarePlus /> Add New Category
                        </Button>
                    </div>
                </ScrollArea>
            </div>
            {editItem !== null && (
                <CategoryEdit
                    isOpen={isEditOpen}
                    setIsOpen={handleIsEditOpen}
                    editItem={editItem}
                    onSave={onEditSave}
                />
            )}
            {isExpenseView && selectedAccId && (
                <CategoryExpense
                    isOpen={isExpenseView}
                    categoryId={selectedAccId}
                    setIsOpen={setIsExpenseView}></CategoryExpense>
            )}
        </>
    );
}
