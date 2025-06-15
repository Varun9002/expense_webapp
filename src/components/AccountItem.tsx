import { UUID } from "crypto";
import { Ellipsis, Landmark, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import Currency from "./ui/currency";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getAccountBalance } from "@/lib/db_helpers";
type ItemBoxProps = {
    name: string;
    amount: number;
    editHandler: (id: UUID) => void;
    deleteHandler: (id: UUID) => void;
    id: UUID;
    onClick: React.MouseEventHandler<HTMLDivElement>;
};
export function AccountItem({
    name,
    amount,
    editHandler,
    id,
    deleteHandler,
    onClick,
}: ItemBoxProps) {
    const [totalAmount, setTotalAmount] = useState(amount);
    useEffect(() => {
        getAccountBalance(id).then((balance) => {
            setTotalAmount(balance);
        });
    }, [id, amount]);
    return (
        <>
            <CardContent className="w-full" onClick={onClick}>
                <div className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-popover">
                    <Landmark />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            {name}
                        </p>
                        <p className="text-sm font-medium">
                            Balance:{" "}
                            <Currency
                                type="auto"
                                value={totalAmount}></Currency>
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="hover:cursor-pointer"
                                variant={"ghost"}>
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setTimeout(() => {
                                        editHandler(id);
                                    }, 0);
                                }}>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setTimeout(() => {
                                        deleteHandler(id);
                                    }, 0);
                                }}>
                                <Trash2 />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </>
    );
}
