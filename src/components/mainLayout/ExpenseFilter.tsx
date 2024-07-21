import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Healthcare", "Shopping", "Travel", "Investment", "Entertainment", "Food", "Education", "Transportation", "Rent", "Utilities", "Bonus", "Freelance", "Gift", "Salary"];
const currencies = ["EUR", "JPY", "USD", "INR", "GBP"];

const ExpenseFilter: React.FC = () => (
  <div className="filterSection w-full flex flex-row xs:flex-col gap-2">
    <div className="flex w-full flex-row gap-3">
      <Input placeholder="Search" className="h-8" />
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
            {categories.map(category => (
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
            {currencies.map(currency => (
              <SelectItem key={currency} value={currency}>{currency}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default ExpenseFilter;
