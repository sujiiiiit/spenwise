import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import{cn} from "@/lib/utils";
import { currencies, categories } from "@/lib/types";

interface SelectProps {
  type?: 'type' | 'currency' | 'category';
  className?: string;
  value: string;
  onChange: (value: string) => void;
  ref?: React.RefObject<HTMLSelectElement>;
}

export function SelectComponent({ type, value, onChange,className }: SelectProps) {
  const renderOptions = () => {
    switch (type) {
      case 'type':
        return (
          <>
            <SelectLabel>Type</SelectLabel>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </>
        );
      case 'currency':
        return (
          <>
            <SelectLabel>Currency</SelectLabel>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </>
        );
      case 'category':
        return (
          <>
            <SelectLabel>Category</SelectLabel>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger  className={cn("w-[180px] ",className)}>
        <SelectValue placeholder={type ? type.charAt(0).toUpperCase() + type.slice(1) : "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {renderOptions()}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
