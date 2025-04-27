import { UUID } from 'crypto';
import Dexie, { type EntityTable } from 'dexie';

interface Account {
	id: UUID;
	name: string;
	intialAmount: number;
	trackedAmount: number;
}

interface Expense {
	id: UUID;
	name: string;
	amount: number;
	category_id: UUID;
	account_id: UUID;
	date: Date;
}

interface Category {
	id: UUID;
	name: string;
	symbol: string;
}

const db = new Dexie('ExpenseDb') as Dexie & {
	account: EntityTable<Account, 'id'>;
	expense: EntityTable<Expense, 'id'>;
	category: EntityTable<Category, 'id'>;
};

// Schema declaration:
db.version(1).stores({
	account: '++id, name, intialAmount,trackedAmount ',
	expense: '++id, name, amount,category_id,account_id, date ',
	category: '++id, name, symbol',
});

export { db };
export type { Account, Category, Expense };
