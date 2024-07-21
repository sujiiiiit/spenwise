import axios from "axios";
import { Expense } from "@/lib/types.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchExpenses = async (
  userId: string,
  month?: string,
  year?: string
): Promise<Expense[]> => {
  try {
    const response = await axios.post<Expense[]>(`${API_URL}/expenses`, {
      userId,
      month,
      year,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Fetch expenses error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Fetch expenses error:", error);
    }
    throw new Error("Failed to fetch expenses. Please try again.");
  }
};

// New function to delete expense
export const deleteExpense = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/remove/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Delete expense error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Delete expense error:", error);
    }
    throw new Error("Failed to delete expense. Please try again.");
  }
};
