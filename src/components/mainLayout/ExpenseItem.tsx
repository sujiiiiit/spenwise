import React from "react";
import { DeleteIcon } from "@/components/Icons/Icons";
import { Expense } from "@/lib/types";
import { Alert } from "./AlertDialog"; // Updated import path

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void; // Callback function to handle deletion
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  const handleDelete = async () => {
    await onDelete(expense._id);
  };

  return (
    <div className="flex px-4 gap-2 py-2 cursor-pointer">
      <div className="w-full grid grid-cols-5 gap-2">
        <div className="categoryLabel col-span-1 flex justify-start items-center">
          <span className="rounded-sm w-full overflow-hidden text-ellipsis clamp-1">
            {expense.category}
          </span>
        </div>
        <div className="noteLabel col-span-3 flex justify-start items-center">
          {expense.note}
        </div>
        <div
          className={`col-span-1 flex justify-end items-center ${
            expense.type === "Income" ? "income text-[var(--green)]" : "expense text-[var(--red)]"
          }`}
        >
          {expense.type === "Income" ? "+" : "-"}
          {expense.amount.toFixed(2)}
        </div>
      </div>
      <div className="moreicons flex items-center">
        <Alert
          heading="Confirm Deletion"
          message="Are you sure you want to delete this expense? This action cannot be undone."
          btnText="Continue"
          alertType="alert"
          onConfirm={handleDelete} // Pass the confirm handler directly
        >
          <button
            className="flex justify-center items-center border-none outline-none cursor-pointer w-6 h-full"
            aria-label={`Delete ${expense.category} expense`}
          >
            <DeleteIcon className="fill-[var(--red)] w-4 h-4 xs:w-3 xs:h-3" />
          </button>
        </Alert>
      </div>
    </div>
  );
};

export default ExpenseItem;
