import { UUID } from "crypto";
import Dexie, { type EntityTable } from "dexie";
import { IconName } from "lucide-react/dynamic";
interface Account {
    id: UUID;
    name: string;
    intialAmount: number;
}

interface Expense {
    id: UUID;
    type: string;
    amount: number;
    note: string;
    category_id: UUID;
    account_id: UUID;
    date: Date;
}

interface Category {
    id: UUID;
    name: string;
    symbol: IconName;
}

const db = new Dexie("ExpenseDb") as Dexie & {
    account: EntityTable<Account, "id">;
    expense: EntityTable<Expense, "id">;
    category: EntityTable<Category, "id">;
};

// Schema declaration:
db.version(1).stores({
    account: "++id, name, intialAmount ",
    expense: "++id, type, amount, note, category_id,account_id, date ",
    category: "++id, name, symbol",
});

export { db };
export type { Account, Category, Expense };
