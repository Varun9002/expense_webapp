import { Account, db } from '@/lib/db_schema';
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
