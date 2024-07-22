import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currencies,categories } from "@/lib/types";

interface FilterProps {
  filters: {
    searchTerm: string;
    type: string;
    category: string;
    currency: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const ExpenseFilter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const handleValueChange = (name: string) => (value: string) => {
    if (value === "All") {
      onFilterChange(name, "");
    } else {
      onFilterChange(name, value);
    }
  };

  return (
    <div className="filterSection w-full flex flex-row xs:flex-col gap-2">
      <div className="flex w-full flex-row gap-3">
        <Input
          placeholder="Search"
          className="h-8"
          value={filters.searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e.target.value)}
        />
      </div>
      <div className="flex w-full gap-3">
        <Select value={filters.type} onValueChange={handleValueChange('type')}>
          <SelectTrigger className="w-[120px] xs:w-full h-8">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={filters.category} onValueChange={handleValueChange('category')}>
          <SelectTrigger className="w-[120px] xs:w-full h-8">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={filters.currency} onValueChange={handleValueChange('currency')}>
          <SelectTrigger className="w-[120px] xs:w-full h-8">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currency</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              {currencies.map(currency => (
                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
