import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/mainLayout/Form/datePicker";
import { SelectComponent } from "@/components/mainLayout/Form/selectComponent";
import { addExpense } from "@/lib/service";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {Plus} from "lucide-react";

export default function DrawerComponent({onExpenseAdded}: {onExpenseAdded: () => void}) {
  const [isOpen, setIsOpen] = useState(false);
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

  function convertToDateString(dateStr:string) {
    const date = new Date(dateStr);

    // Extract parts of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format the date
    const newdate= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return String(newdate);
  }

  const handleSubmit = async () => {
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
        dateTime: convertToDateString(String(dateTime)),
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
      setIsOpen(false);
      onExpenseAdded();

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
      <DrawerTrigger className="fixed w-15 h-15 p-4 bottom-10 right-10 xs:right-5 xs:bottom-5 bg-black dark:bg-white text-white rounded-full text-center shadow-lg" onClick={() => setIsOpen(true?false:true)}><Plus className="dark:stroke-black"/></DrawerTrigger>
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
