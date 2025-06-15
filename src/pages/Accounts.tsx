import { AccountEdit } from "@/components/AccountEdit";
import AccountExpense from "@/components/AccountExpense";
import { AccountItem } from "@/components/AccountItem";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    clearAccount,
    deleteAccount,
    getAccount,
    getExpenseStatus,
    newAccount,
    updateAccount,
} from "@/lib/db_helpers";
import { Account } from "@/lib/db_schema";
import { UUID } from "crypto";
import { CircleAlertIcon, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Accounts() {
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const allAccountTotal = incomeTotal - expenseTotal;
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isExpenseView, setIsExpenseView] = useState(false);
    const [editItem, setEditItem] = useState<Account | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedAccId, setSelectedAccId] = useState<UUID | null>(null);

    useEffect(() => {
        clearAccount()
            .then(() => getAccount())
            .then((acc) => {
                setAccounts(acc);
                return getExpenseStatus();
            })
            .then(({ earn, spent }) => {
                setExpenseTotal(spent);
                setIncomeTotal(earn);
            });
    }, []);

    async function onEditSave(updAccount: Account) {
        await updateAccount(updAccount);
        const filtetAcc = await getAccount();

        setAccounts(filtetAcc);
        handleIsEditOpen(false);
    }
    function handleEdit(id: UUID) {
        const filterAcc = accounts.filter((acc) => {
            return acc.id === id;
        });
        if (filterAcc.length > 0) {
            setEditItem(filterAcc[0]);
            setIsEditOpen(true);
        } else {
            toast("Unexpected error encountered", {
                description: "Cannot find selected Account",
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
        await deleteAccount(id);
        const filtetAcc = await getAccount();

        setAccounts(filtetAcc);
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
        const acc = newAccount();
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
                            {accounts.map((acc) => {
                                return (
                                    <AccountItem
                                        name={acc.name}
                                        amount={acc.intialAmount}
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
                            <SquarePlus /> Add New Account
                        </Button>
                    </div>
                </ScrollArea>
            </div>
            {editItem !== null && (
                <AccountEdit
                    isOpen={isEditOpen}
                    setIsOpen={handleIsEditOpen}
                    editItem={editItem}
                    onSave={onEditSave}
                />
            )}
            {isExpenseView && selectedAccId && (
                <AccountExpense
                    isOpen={isExpenseView}
                    accId={selectedAccId}
                    setIsOpen={setIsExpenseView}></AccountExpense>
            )}
        </>
    );
}
