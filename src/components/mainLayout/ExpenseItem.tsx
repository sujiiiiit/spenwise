import React from "react";
import { DeleteIcon } from "@/components/Icons/Icons";
import { Expense } from "@/lib/types";

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => (
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
      <div className={`${
        expense.type === "Income" ? "text-[var(--green)]" : "text-[var(--red)]"
      } col-span-1 flex justify-end items-center`}>
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
);

export default ExpenseItem;
