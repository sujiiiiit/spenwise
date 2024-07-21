"use client"

import React, { useEffect, useState, useCallback } from "react";
import { fetchExpenses, deleteExpense } from "@/lib/service";
import { Expense, GroupedExpenses } from "@/lib/types";
import { getDayAndDate } from "@/lib/functions";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItem";
import { PieCharts } from "./Charts/pieChart"; // Import the PieCharts component

const groupByDate = (expenses: Expense[]): GroupedExpenses[] => {
  const grouped = expenses.reduce(
    (acc: { [key: string]: Expense[] }, expense) => {
      const date = expense.dateTime.split(" ")[0]; // Extract date in YYYY-MM-DD format
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    },
    {}
  );

  return Object.keys(grouped).map(date => ({
    date,
    expenses: grouped[date],
  }));
};

const calculateTotals = (expenses: Expense[]) => {
  return expenses.reduce(
    (totals, expense) => {
      if (expense.type === "Income") {
        totals.income += expense.amount;
      } else if (expense.type === "Expense") {
        totals.expense += expense.amount;
      }
      return totals;
    },
    { income: 0, expense: 0 }
  );
};

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ExpensesList: React.FC = () => {
  const [groupedExpenses, setGroupedExpenses] = useState<GroupedExpenses[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<string>(new Date().getFullYear().toString());
  const [currentMonth, setCurrentMonth] = useState<string>((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "",
    category: "",
    currency: "",
  });

  const fetchAndGroupExpenses = useCallback(async (month: string, year: string) => {
    setLoading(true);
    try {
      const userId = "si2nfh"; // Replace with the actual user ID if needed
      const data = await fetchExpenses(userId, month, year);
      const grouped = groupByDate(data);
      setGroupedExpenses(grouped);
    } catch (err: any) {
      setError(err.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndGroupExpenses(currentMonth, currentYear);
  }, [currentMonth, currentYear, fetchAndGroupExpenses]);

  const handlePreviousMonth = () => {
    let newMonth = (parseInt(currentMonth) - 1).toString().padStart(2, '0');
    let newYear = currentYear;

    if (parseInt(newMonth) === 0) {
      newMonth = "12";
      newYear = (parseInt(currentYear) - 1).toString();
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = (parseInt(currentMonth) + 1).toString().padStart(2, '0');
    let newYear = currentYear;

    if (parseInt(newMonth) === 13) {
      newMonth = "01";
      newYear = (parseInt(currentYear) + 1).toString();
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      // Refresh expenses after deletion
      fetchAndGroupExpenses(currentMonth, currentYear);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const filteredGroupedExpenses = groupedExpenses
    .map(group => ({
      ...group,
      expenses: group.expenses.filter(expense =>
        expense.note.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        (filters.type ? expense.type === filters.type : true) &&
        (filters.category ? expense.category === filters.category : true) &&
        (filters.currency ? expense.currency === filters.currency : true)
      ),
    }))
    .filter(group => group.expenses.length > 0) // Keep only non-empty groups
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

  const calculateTotalsByCategory = (expenses: Expense[]) => {
    return expenses.reduce((acc, expense) => {
      const key = expense.category || "Other";
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += expense.amount;
      return acc;
    }, {} as { [key: string]: number });
  };

  const incomeExpenses = filteredGroupedExpenses.flatMap(group => group.expenses).filter(expense => expense.type === "Income");
  const expenseExpenses = filteredGroupedExpenses.flatMap(group => group.expenses).filter(expense => expense.type === "Expense");

  const incomeByCategory = calculateTotalsByCategory(incomeExpenses);
  const expenseByCategory = calculateTotalsByCategory(expenseExpenses);

  const transformToPieChartData = (data: { [key: string]: number }) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    return Object.entries(data).map(([category, amount]) => ({
      category,
      amount,
      fill: getRandomColor(), // Set a random color for each category
      percent: total > 0 ? amount / total : 0
    }));
  };

  const incomePieData = transformToPieChartData(incomeByCategory);
  const expensePieData = transformToPieChartData(expenseByCategory);

  // Calculate total monthly income and expense
  const totalMonthlyIncome = incomeExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalMonthlyExpense = expenseExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <>
      <div className="m-3">
        <div className="flex m-auto flex-col gap-2">
          <ExpenseHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            onPrevious={handlePreviousMonth}
            onNext={handleNextMonth}
          />
          <PieCharts incomeData={incomePieData} expenseData={expensePieData} totalincome={totalMonthlyIncome.toFixed(2)} totalexpense={totalMonthlyExpense.toFixed(2)}/>

          <ExpenseFilter filters={filters} onFilterChange={handleFilterChange} />
          {error && <p>Error: {error}</p>}
          {loading && <p>Loading...</p>}
          
        

          <div className="mainData w-full">
            {filteredGroupedExpenses.length === 0
              ? !loading && <p>No expenses found.</p>
              : filteredGroupedExpenses.map(({ date, expenses }) => {
                  const { income, expense } = calculateTotals(expenses);

                  return (
                    <div key={date} className="w-full flex flex-col items-center justify-between bg-black/10 dark:bg-white/10 rounded-lg text-sm my-3">
                      <div className="w-full flex items-center justify-between font-bold px-4 py-2">
                        <div className="w-full flex items-center gap-2">
                          {getDayAndDate(date)}
                        </div>
                        <div className="flex gap-5">
                          <span className="totalincome text-[var(--green)]">+{income.toFixed(2)}</span>
                          <span className="totalexpense text-[var(--red)]">-{expense.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="w-full h-[2px] xs:h-[1px] bg-background "></div>
                      <div className="w-full">
                        {expenses.map(expense => (
                          <ExpenseItem
                            key={expense._id}
                            expense={expense}
                            onDelete={handleDeleteExpense} // Pass the handler here
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesList;
