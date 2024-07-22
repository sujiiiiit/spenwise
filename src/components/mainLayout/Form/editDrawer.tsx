import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/mainLayout/Form/datePicker";
import { SelectComponent } from "@/components/mainLayout/Form/selectComponent";
import { editExpense } from "@/lib/service";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Expense } from "@/lib/types";

// Helper function to format date as YYYY-MM-DD HH:MM:SS
const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

interface EditDrawerProps {
  expenseData: Expense | null;
  openClose: boolean;
  userId: string; // Add userId prop
  onClose: () => void;
  onExpenseEdited?: () => void; // Add onExpenseEdited prop
}

const EditDrawer: React.FC<EditDrawerProps> = ({
  expenseData,
  userId,
  openClose,
  onClose,
  onExpenseEdited,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState<Date | undefined>(undefined);
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("");
  const [note, setNote] = useState("");
  const { toast } = useToast();
  if (isOpen !== openClose) setIsOpen(openClose);

  useEffect(() => {
    if (expenseData) {
      setIsOpen(true);
      setTitle(expenseData.title);
      setDateTime(new Date(expenseData.dateTime));
      setAmount(expenseData.amount);
      setType(expenseData.type);
      setCategory(expenseData.category);
      setCurrency(expenseData.currency);
      setNote(expenseData.note);
    }
  }, [expenseData]);

  const handleSubmit = async () => {
    let validationErrors: string[] = [];

    if (!title) validationErrors.push("Title");
    if (!dateTime) validationErrors.push("Date");
    if (amount === "") validationErrors.push("Amount");
    if (!type) validationErrors.push("Type");
    if (!category) validationErrors.push("Category");
    if (!currency) validationErrors.push("Currency");

    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: `The following fields are required: ${validationErrors.join(
          ", "
        )}`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      return;
    }

    try {
      if (expenseData) {
        await editExpense(expenseData._id, {
          userId,
          title,
          dateTime: dateTime ? formatDateTime(dateTime) : "",
          amount: amount || 0, // Use 0 if amount is empty
          type,
          category,
          currency,
          note,
        });
        toast({
          title: "Success!",
          description: "Expense updated successfully.",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
        setIsOpen(false);
        if (onExpenseEdited) {
          onExpenseEdited();
        }
        onClose();
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast({
        title: "Error",
        description: "Failed to update expense. Please try again.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-fit">
        <DrawerHeader className="m-auto text-center">
          <DrawerTitle className="text-center">Edit Expense</DrawerTitle>
          <DrawerDescription>
            Update the expense details below
          </DrawerDescription>
        </DrawerHeader>
        <DrawerClose onClick={() => setIsOpen(false)} /> {/* Close button */}
        <div className="form flex flex-col gap-2 w-full max-w-96 m-auto xs:px-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex gap-2">
            <DatePicker selectedDate={dateTime} onDateChange={setDateTime} />
            <SelectComponent type="type" value={type} onChange={setType} />
          </div>
          <div className="w-full flex gap-2">
            <Input
              placeholder="Amount"
              type="number"
              value={amount === "" ? "" : amount} // Handle empty string case
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : "")
              }
            />
            <SelectComponent
              type="currency"
              value={currency}
              onChange={setCurrency}
            />
          </div>
          <SelectComponent
            className="!w-full"
            type="category"
            value={category}
            onChange={setCategory}
          />
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type your message here."
          />
          <DrawerFooter className="px-0">
            <Button onClick={handleSubmit}>Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditDrawer;
