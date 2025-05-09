import { Account, db, Expense } from '@/lib/db_schema';
import { UUID } from 'crypto';

export const addAccount = async (account: Account) => {
	await db.account.add(account);
};

export const newAccount = async () => {
	const id = crypto.randomUUID();
	await db.account.add({
		id: id,
		name: '',
		intialAmount: 0,
		trackedAmount: 0,
	});
	return id;
};

export const getAccount = async () => {
	return await db.account.toArray();
};

export const updateAccount = async (account: Account) => {
	await db.account.put(account);
};

export const deleteAccount = async (id: UUID) => {
	await db.account.delete(id);
};

export const clearAccount = async () => {
	const initAccounts: Account[] = [
		{
			id: '5fd0857c-6181-494f-bd2c-b69126d175b8',
			name: 'Account 1',
			intialAmount: 100,
			trackedAmount: 11,
		},
		{
			id: 'ea7ef766-a1a5-4239-9297-97a57c1b0f07',
			name: 'Account 2',
			intialAmount: 0,
			trackedAmount: 11,
		},
	];
	if ((await getAccount()).length == 0) {
		await db.account.bulkPut(initAccounts);
	}
};
export const clearExpense = async () => {
	const initExpenses: Expense[] = [
		{
			id: '5fd0857c-6181-494f-bd2c-b69126d175b8',
			name: 'Exp1',
			amount: -22.2,
			category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
			account_id: '6d71b1bd-f1e3-4eb8-8766-1c1011d1e550',
			date: new Date(),
		},
		{
			id: '5fd0857c-6181-494f-bd2c-b69126d175a2',
			name: 'Exp2',
			amount: 42.2,
			category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
			account_id: '5fd0857c-6181-494f-bd2c-b69126d175b8',
			date: new Date(2025, 4, 11),
		},
		{
			id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
			name: 'Exp1',
			amount: -22.2,
			category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
			account_id: '6d71b1bd-f1e3-4eb8-8766-1c1011d1e550',
			date: new Date(),
		},
		{
			id: '5fd0857c-6181-494f-bd2c-b69126d175a1',
			name: 'Exp2',
			amount: 42.2,
			category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
			account_id: '5fd0857c-6181-494f-bd2c-b69126d175b8',
			date: new Date(2025, 4, 11),
		},
		{
			id: '5fd0857c-6181-494f-bd2c-b69126d175b3',
			name: 'Exp1',
			amount: -22.2,
			category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
			account_id: '6d71b1bd-f1e3-4eb8-8766-1c1011d1e550',
			date: new Date(),
		},
		{
			id: '5fd0857c-6181-494f-bd2c-b69126d175a3',
			name: 'Exp2',
			amount: 42.2,
			category_id: '5fd0857c-6181-494f-bd2c-b69126d175b1',
			account_id: '5fd0857c-6181-494f-bd2c-b69126d175b8',
			date: new Date(2025, 4, 11),
		},
	];
	if ((await getExpenses()).length == 0) {
		await db.expense.bulkPut(initExpenses);
	}
};
export const getExpenses = async () => {
	return await db.expense.toArray();
};
function getFirstAndLastDay(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth();

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);

	return { firstDay, lastDay };
}
export const getExpensesByMonth = async (date: Date) => {
	const { firstDay, lastDay } = getFirstAndLastDay(date);
	const expenses = await db.expense
		.where('date')
		.between(firstDay, lastDay, true, true)
		.sortBy('date');
	const accounts = await getAccount();
	return expenses.reverse().map((exp) => {
		const id = exp.account_id;
		const acc = accounts.filter((ac) => ac.id === id)[0] || {
			id: '5fd0857c-6181-494f-bd2c-b69126d175b8',
			name: 'Account 1',
			intialAmount: 100,
			trackedAmount: 11,
		};
		return { ...exp, account: acc };
	});
};
