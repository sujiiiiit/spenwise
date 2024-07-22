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

export const categoriesWithColors = [
  { category: "Healthcare", fill: "#FF5733" }, // Example color: Red-Orange
  { category: "Shopping", fill: "#33FF57" }, // Example color: Green
  { category: "Travel", fill: "#3357FF" }, // Example color: Blue
  { category: "Investment", fill: "#F3FF33" }, // Example color: Yellow
  { category: "Entertainment", fill: "#FF33A6" }, // Example color: Pink
  { category: "Food", fill: "#33FFF7" }, // Example color: Teal
  { category: "Education", fill: "#F8FF33" }, // Example color: Light Yellow
  { category: "Transportation", fill: "#FF8C33" }, // Example color: Orange
  { category: "Rent", fill: "#8C33FF" }, // Example color: Purple
  { category: "Utilities", fill: "#33FF8C" }, // Example color: Light Green
  { category: "Bonus", fill: "#FF3333" }, // Example color: Red
  { category: "Freelance", fill: "#33FF33" }, // Example color: Light Green
  { category: "Gift", fill: "#FF33D4" }, // Example color: Magenta
  { category: "Salary", fill: "#33D4FF" }, // Example color: Light Blue
];

export const currencies = ["EUR", "JPY", "USD", "INR", "GBP"];
