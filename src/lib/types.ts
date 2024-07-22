export interface Expense {
  _id: string;
  userId: string;
  dateTime: string;
  amount: number;
  type: string;
  category: string;
  title: string;
  currency: string;
  note: string;
}

export interface GroupedExpenses {
  date: string;
  expenses: Expense[];
}

export const categories = [
  "Healthcare",
  "Shopping",
  "Travel",
  "Investment",
  "Entertainment",
  "Food",
  "Education",
  "Transportation",
  "Rent",
  "Utilities",
  "Bonus",
  "Freelance",
  "Gift",
  "Salary",
];
export const currencies = ["EUR", "JPY", "USD", "INR", "GBP"];
