import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import classNames from "classnames";

interface AlertDialogProps {
  heading: string;
  message: string;
  btnText: string;
  alertType?: "alert" | "confirm";
  onConfirm?: () => void; 
  children: React.ReactNode; 
}

export const Alert: React.FC<AlertDialogProps> = ({
  heading,
  message,
  btnText,
  alertType,
  onConfirm,
  children, 
}) => {
  const actionButtonClass = classNames({
    "bg-[var(--red)] text-white": alertType === "alert",
    "bg-[var(--blue)] text-white": alertType === "confirm",
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children} 
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{heading}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={actionButtonClass}
            onClick={() => {
              if (onConfirm) onConfirm(); // Call the confirmation handler
            }}
          >
            {btnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
