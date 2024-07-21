import React from "react";
import { PreviousIcon, NextIcon } from "@/components/Icons/Icons";
import { getMonthName } from "@/lib/functions";

interface ExpenseHeaderProps {
  currentMonth: string;
  currentYear: string;
  onPrevious: () => void;
  onNext: () => void;
}

const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({ currentMonth, currentYear, onPrevious, onNext }) => (
  <div className="flex justify-between items-center h-8 bg-black/10 dark:bg-white/10 rounded-xl xs:rounded-lg px-4 py-6 xs:p-2">
    <span className="flex justify-center items-center border-none outline-none cursor-pointer w-6 h-full" onClick={onPrevious}>
      <PreviousIcon className="fill-black dark:fill-white w-6 h-6 xs:w-5 xs:h-5" />
    </span>
    <span className="flex items-center justify-center">
      {getMonthName(Number(currentMonth))} {currentYear}
    </span>
    <span className="flex justify-center items-center border-none outline-none cursor-pointer w-6 h-full" onClick={onNext}>
      <NextIcon className="fill-black dark:fill-white w-6 h-6 xs:w-5 xs:h-5" />
    </span>
  </div>
);

export default ExpenseHeader;
