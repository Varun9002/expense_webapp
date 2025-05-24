import { Account, Category, db, Expense } from "@/lib/db_schema";
import { UUID } from "crypto";

export const addAccount = async (account: Account) => {
    await db.account.add(account);
};

export const newAccount = () => {
    const id = crypto.randomUUID();
    const newItem = {
        id: id,
        name: "",
        intialAmount: 0,
        trackedAmount: 0,
    };
    // await db.account.add(newItem);
    return newItem;
};

export const getAccount = async () => {
    return await db.account.toArray();
};

export const getAccountByID = async (id: UUID) => {
    return await db.account.get(id);
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
            id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            name: "Kotak",
            intialAmount: 100,
            trackedAmount: 11,
        },
        {
            id: "ea7ef766-a1a5-4239-9297-97a57c1b0f07",
            name: "HDFC",
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
            id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            note: "Test Note",
            amount: -22.2,
            category_id: "de2440a4-effc-43ae-8c53-b278e5574424",
            account_id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            date: new Date(),
        },
        {
            id: "5fd0857c-6181-494f-bd2c-b69126d175a2",
            note: "Test Note",
            amount: 42.2,
            category_id: "cbda628e-7109-4a6d-8279-eae0fe80fffd",
            account_id: "ea7ef766-a1a5-4239-9297-97a57c1b0f07",
            date: new Date(2025, 4, 11),
        },
        {
            id: "5fd0857c-6181-494f-bd2c-b69126d175b1",
            note: "Test Note",
            amount: -22.2,
            category_id: "dd76c2d0-bb2f-4194-b1dc-f702bbe47efe",
            account_id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            date: new Date(),
        },
        {
            id: "5fd0857c-6181-494f-bd2c-b69126d175a1",
            note: "Test Note",
            amount: 42.2,
            category_id: "cbda628e-7109-4a6d-8279-eae0fe80fffd",
            account_id: "ea7ef766-a1a5-4239-9297-97a57c1b0f07",
            date: new Date(2025, 4, 11),
        },
        {
            id: "5fd0857c-6181-494f-bd2c-b69126d175b3",
            note: "Test Note",
            amount: -22.2,
            category_id: "dd76c2d0-bb2f-4194-b1dc-f702bbe47efe",
            account_id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            date: new Date(),
        },
        {
            id: "5fd0857c-6181-494f-bd2c-b69126d175a3",
            note: "Test Note",
            amount: 42.2,
            category_id: "ca8998cd-8f0f-41fa-b1b3-9318f13a3f98",
            account_id: "ea7ef766-a1a5-4239-9297-97a57c1b0f07",
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
const getFirstAndLastDay = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    return { firstDay, lastDay };
};
export const getExpensesByMonth = async (date: Date) => {
    const { firstDay, lastDay } = getFirstAndLastDay(date);
    const expenses = await db.expense
        .where("date")
        .between(firstDay, lastDay, true, true)
        .sortBy("date");
    const accounts = await getAccount();
    const categories = await getCategory();
    return expenses.reverse().map((exp) => {
        const accId = exp.account_id;
        const catId = exp.category_id;
        const acc = accounts.filter((ac) => ac.id === accId)[0] || {
            id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            name: "Unknown Account",
            intialAmount: 100,
            trackedAmount: 11,
        };
        const catg = categories.filter((ac) => ac.id === catId)[0] || {
            id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            name: "Unknown",
            symbol: "ban",
        };
        return { ...exp, account: acc, category: catg };
    });
};

export const getExpensesByAccount = async (accId: UUID) => {
    const expenses = await db.expense
        .where("account_id")
        .equals(accId)
        .sortBy("date");
    const categories = await getCategory();
    return expenses.reverse().map((exp) => {
        const id = exp.category_id;
        const catg = categories.filter((ac) => ac.id === id)[0] || {
            id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            name: "Unknown",
            symbol: "ban",
        };
        return { ...exp, category: catg };
    });
};

export const getExpenseStatus = async () => {
    const expenses = await getExpenses();
    return expenses.reduce(
        (acc, ex) =>
            ex.amount > 0
                ? { ...acc, earn: acc.earn + ex.amount }
                : { ...acc, spent: acc.spent + ex.amount },
        { earn: 0, spent: 0 }
    );
};

export const getExpenseById = async (id: UUID) => {
    return await db.expense.get(id);
};
export const clearCategory = async () => {
    const initCategory: Category[] = [
        {
            id: "dd76c2d0-bb2f-4194-b1dc-f702bbe47efe",
            name: "Food",
            symbol: "utensils-crossed",
        },
        {
            id: "cbda628e-7109-4a6d-8279-eae0fe80fffd",
            name: "Friends",
            symbol: "handshake",
        },
        {
            id: "ca8998cd-8f0f-41fa-b1b3-9318f13a3f98",
            name: "Salary",
            symbol: "wallet",
        },
        {
            id: "de2440a4-effc-43ae-8c53-b278e5574424",
            name: "Education",
            symbol: "graduation-cap",
        },
    ];
    if ((await getCategory()).length == 0) {
        await db.category.bulkPut(initCategory);
    }
};

export const getCategory = async () => {
    return await db.category.toArray();
};
export const getCategoryById = async (id: UUID) => {
    return await db.category.get(id);
};

export const deleteCategory = async (id: UUID) => {
    return await db.category.delete(id);
};
export const updateCategory = async (account: Category) => {
    await db.category.put(account);
};
export const newCategory = () => {
    const id = crypto.randomUUID();
    const newItem: Category = {
        id: id,
        name: "",
        symbol: "dot",
    };
    // await db.account.add(newItem);
    return newItem;
};
export const getExpensesByCategory = async (catId: UUID) => {
    const expenses = await db.expense
        .where("category_id")
        .equals(catId)
        .sortBy("date");
    const accounts = await getAccount();
    return expenses.reverse().map((exp) => {
        const id = exp.account_id;
        const acc = accounts.filter((ac) => ac.id === id)[0] || {
            id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
            name: "Unknown Account",
            intialAmount: 100,
            trackedAmount: 11,
        };
        return { ...exp, account: acc };
    });
};
/*
<UtensilsCrossed /> -- food
<Shirt /> -- Cloths
<Handshake /> -- Friends
<ShoppingBasket /> -- Shopping
<CreditCard /> -- Credit card
<GraduationCap /> -- Education 

Income
<Wallet /> -- salary
<HandCoins /> -- Rewards / interests
*/
