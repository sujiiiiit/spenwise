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