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
