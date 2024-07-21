import React, { useEffect, useState } from "react";
import { fetchExpenses } from "@/lib/service";
import { Expense, GroupedExpenses } from "@/lib/types";
import { getDayAndDate, getMonthName } from "@/lib/functions";
import {
  PreviousIcon,
  NextIcon,
  FilterIcon,
  DeleteIcon,
} from "@/components/Icons/Icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return Object.keys(grouped).map((date) => ({
    date,
    expenses: grouped[date],
  }));
};

const categories = [
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

const currencies = ["EUR", "JPY", "USD", "INR", "GBP"];

const ExpensesList: React.FC = () => {
  const [groupedExpenses, setGroupedExpenses] = useState<GroupedExpenses[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Dynamically get current month and year
  const today = new Date();
  const currentYear = today.getFullYear().toString();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
console.log(currentMonth, currentYear)
  useEffect(() => {
    const userId = "si2nfh"; // Replace with the actual userId

    const getExpenses = async () => {
      setLoading(true);
      try {
        const data = await fetchExpenses(
          userId,
          currentMonth,
          currentYear
        );
        const grouped = groupByDate(data); // Group data by date
        setGroupedExpenses(grouped);
      } catch (err: any) {
        setError(err.message || "Failed to fetch expenses");
      } finally {
        setLoading(false);
      }
    };

    getExpenses();
  }, [currentMonth, currentYear]);

  return (
    <div className="m-3">
      <div className="flex m-auto flex-col gap-2">
        <div className="flex justify-between items-center h-8 bg-black/10 dark:bg-white/10 rounded-xl xs:rounded-lg px-4 py-6 xs:p-2">
          <span className="flex justify-center items-center border-none outline-none cursor-pointer w-6 h-full">
            <PreviousIcon className="fill-black dark:fill-white w-6 h-6 xs:w-5 xs:h-5" />
          </span>
          <span className="flex items-center justify-center">
            {getMonthName(Number(currentMonth))} {currentYear}
          </span>
          <span className="flex justify-center items-center border-none outline-none cursor-pointer w-6 h-full">
            <NextIcon className="fill-black dark:fill-white w-6 h-6 xs:w-5 xs:h-5" />
          </span>
        </div>
        <div className="filterSection w-full flex flex-row xs:flex-col gap-2">
          <div className="flex w-full flex-row gap-3">
            <Input placeholder="Search" className="h-8" />
            <span className="hidden xs:flex justify-center items-center border-none outline-none cursor-pointer w-6 h-full">
              <FilterIcon className="fill-black dark:fill-white w-10 h-10 xs:h-8 xs:w-8" />
            </span>
          </div>
          <div className="flex w-full gap-3">
            <Select>
              <SelectTrigger className="w-[120px] xs:w-full h-8">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="Expense">Expense</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[120px] xs:w-full h-8">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[120px] xs:w-full h-8">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currency</SelectLabel>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && <p>Error: {error}</p>}
        {loading && <p>Loading...</p>}

        <div className="mainData w-full">
          {groupedExpenses.length === 0
            ? !loading && <p>No expenses found.</p>
            : groupedExpenses.map(({ date, expenses }) => (
                <div
                  key={date}
                  className="w-full flex flex-col items-center justify-between bg-black/10 dark:bg-white/10 rounded-lg text-sm my-3"
                >
                  <div className="w-full flex items-center justify-between font-bold px-4 py-2">
                    <div className="w-full flex items-center gap-2">
                      {getDayAndDate(date)}
                    </div>
                    <div className="flex gap-5">
                      <span className="incometxt text-[var(--green)]">
                        +1256
                      </span>
                      <span className="expensetxt text-[var(--red)]">
                        -2000
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-[2px] xs:h-[1px] bg-background "></div>
                  <div className="w-full">
                    {expenses.map((expense) => (
                      <div className="flex px-4 gap-2" key={expense._id}>
                        <div className="w-full grid grid-cols-5 gap-2 py-2 cursor-pointer">
                          <div className="categoryLabel col-span-1 flex justify-start items-center">
                            <span className="rounded-sm w-full overflow-hidden text-ellipsis clamp-[1]">
                              {expense.category}
                            </span>
                          </div>
                          <div className="noteLabel col-span-3 flex justify-start items-center">
                            {expense.note}
                          </div>
                          <div
                            className={`${
                              expense.type === "Income"
                                ? "text-[var(--green)]"
                                : "text-[var(--red)]"
                            } col-span-1 flex justify-end items-center`}
                          >
                            {expense.type === "Income" ? "+" : "-"}
                            {expense.amount.toFixed(2)}
                          </div>
                        </div>
                        <div className="moreicons flex">
                          <span className="flex justify-center items-center border-none outline-none cursor-pointer w-6 h-full">
                            <DeleteIcon className="fill-[var(--red)] w-4 h-4 xs:w-3 xs:h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesList;
