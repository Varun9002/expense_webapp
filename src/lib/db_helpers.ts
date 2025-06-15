import { Account, Category, db, Expense } from "@/lib/db_schema";
import { UUID } from "crypto";
import { toast } from "sonner";

const dummyAccount: Account = {
    id: "1-1-1-1-1",
    name: "Unknown Account",
    intialAmount: 100,
};
const dummyCategory: Category = {
    id: "1-1-1-1-1",
    name: "Unknown",
    symbol: "ban",
};
const initAccounts: Account[] = [
    {
        id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
        name: "Kotak",
        intialAmount: 100,
    },
    {
        id: "ea7ef766-a1a5-4239-9297-97a57c1b0f07",
        name: "HDFC",
        intialAmount: 0,
    },
];
const initExpenses: Expense[] = [
    {
        id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
        note: "Test Note",
        type: "expense",
        amount: 50,
        category_id: "de2440a4-effc-43ae-8c53-b278e5574424",
        account_id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
        date: new Date(),
    },
    {
        id: "5fd0857c-6181-494f-bd2c-b69126d175a2",
        note: "Test Note",
        type: "income",
        amount: 50,
        category_id: "cbda628e-7109-4a6d-8279-eae0fe80fffd",
        account_id: "ea7ef766-a1a5-4239-9297-97a57c1b0f07",
        date: new Date(),
    },
    {
        id: "5fd0857c-6181-494f-bd2c-b69126d175b1",
        note: "Test Note",
        type: "transfer",
        amount: 50,
        category_id: "ea7ef766-a1a5-4239-9297-97a57c1b0f07",
        account_id: "5fd0857c-6181-494f-bd2c-b69126d175b8",
        date: new Date(),
    },
];

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
export const addAccount = async (account: Account) => {
    await db.account.add(account);
};

export const newAccount = () => {
    const id = crypto.randomUUID();
    const newItem = {
        id: id,
        name: "",
        intialAmount: 0,
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
    if ((await getAccount()).length == 0) {
        await db.account.bulkPut(initAccounts);
    }
};
export const clearExpense = async () => {
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
    return await Promise.all(
        expenses.reverse().map(async (exp) => {
            const accId = exp.account_id;
            const catId = exp.category_id;
            const acc =
                accounts.filter((ac) => ac.id === accId)[0] || dummyAccount;
            if (exp.type === "transfer") {
                const acc2 = (await getAccountByID(catId)) || dummyAccount;
                const catg: Category = {
                    id: "1-1-1-1-1",
                    name: `[ ${acc.name} > ${acc2.name} ]`,
                    symbol: "arrow-right-left",
                };
                return { ...exp, category: catg, account: acc };
            }
            const catg =
                categories.filter((ac) => ac.id === catId)[0] || dummyCategory;
            return { ...exp, account: acc, category: catg };
        })
    );
};

export const getExpensesByAccount = async (accId: UUID) => {
    const acc = (await getAccountByID(accId)) || dummyAccount;
    const expenses = await db.expense
        .where({ category_id: accId, type: "transfer" })
        .or("account_id")
        .equals(accId)
        .sortBy("date");
    const categories = await getCategory();
    return await Promise.all(
        expenses.reverse().map(async (exp) => {
            const id = exp.category_id;
            if (exp.type === "transfer") {
                const acc2 = (await getAccountByID(id)) || dummyAccount;
                const catg: Category = {
                    id: "1-1-1-1-1",
                    name: `[ ${acc.name} > ${acc2.name} ]`,
                    symbol: "arrow-right-left",
                };
                return { ...exp, category: catg, account: acc };
            }
            const catg =
                categories.filter((ac) => ac.id === id)[0] || dummyCategory;
            return { ...exp, category: catg, account: acc };
        })
    );
};
export const getAccountBalance = async (accId: UUID) => {
    const acc = await getAccountByID(accId);
    if (!acc) {
        toast("Account not found for calculating balance");
        return 0; // this should not happen, but just in case
    }
    const expenses = await db.expense
        .where("account_id")
        .equals(accId)
        .or("category_id")
        .equals(accId)
        .toArray();
    console.log(expenses);
    const balance = expenses.reduce((sum, exp) => {
        if (exp.type === "income") {
            return sum + exp.amount;
        } else if (exp.type === "expense") {
            return sum - exp.amount;
        } else if (exp.type === "transfer") {
            if (accId === exp.account_id) return sum - exp.amount;
            else if (accId === exp.category_id) return sum + exp.amount;
        }
        return sum;
    }, acc.intialAmount);

    return balance;
};

export const getExpenseStatus = async () => {
    const expenses = await getExpenses();
    return expenses.reduce(
        (acc, ex) => {
            {
                if (ex.type === "income") {
                    return { ...acc, earn: acc.earn + ex.amount };
                } else if (ex.type === "expense") {
                    return { ...acc, spent: acc.spent - ex.amount };
                } else {
                    // For "transfer" or any other type, do nothing
                    return acc;
                }
            }
        },
        { earn: 0, spent: 0 }
    );
};

export const getExpenseById = async (id: UUID) => {
    return await db.expense.get(id);
};

export const updateExpense = async (exp: Expense) => {
    return await db.expense.put(exp);
};
export const clearCategory = async () => {
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
    const category = (await getCategoryById(catId)) || dummyCategory;
    const expenses = await db.expense
        .where("category_id")
        .equals(catId)
        .sortBy("date");
    const accounts = await getAccount();
    return expenses.reverse().map((exp) => {
        const id = exp.account_id;
        const acc = accounts.filter((ac) => ac.id === id)[0] || dummyAccount;
        return { ...exp, account: acc, category };
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
