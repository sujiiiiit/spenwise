import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose, // Import the close button component
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/mainLayout/Form/datePicker";
import { SelectComponent } from "@/components/mainLayout/Form/selectComponent";
import { addExpense } from "@/lib/service"; // Adjust import path as needed
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function DrawerComponent() {
  const [isOpen, setIsOpen] = useState(false); // State for managing drawer visibility
  const [userId, setUserId] = useState("");
  const [dateTime, setDateTime] = useState<Date | undefined>(undefined);
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("");
  const [note, setNote] = useState("");
  const { toast } = useToast();

  if (userId === "") {
    setUserId(import.meta.env.VITE_USER_ID);
  }

  const handleSubmit = async () => {
    // Validation
    let validationErrors: string[] = [];
  
    if (!title) validationErrors.push("Title");
    if (!dateTime) validationErrors.push("Date");
    if (!amount) validationErrors.push("Amount");
    if (!type) validationErrors.push("Type");
    if (!category) validationErrors.push("Category");
    if (!currency) validationErrors.push("Currency");
  
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: `The following fields are required: ${validationErrors.join(", ")}`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      return;
    }
  
    try {
      await addExpense({
        userId,
        dateTime: String(dateTime), // Convert date to ISO string
        amount: Number(amount),
        type,
        category,
        title,
        currency,
        note,
      });
      toast({
        title: "Success!",
        description: "Expense added successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setIsOpen(false); // Close the drawer after successful submission
    } catch (error) {
      console.error("Error adding expense:", error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  };
  

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger onClick={() => setIsOpen(true)}>Open</DrawerTrigger>
      <DrawerContent className="h-fit">
        <DrawerHeader className="m-auto text-center">
          <DrawerTitle className="text-center">Add Expenses</DrawerTitle>
          <DrawerDescription>Fill out the form and submit</DrawerDescription>
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
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
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
}
