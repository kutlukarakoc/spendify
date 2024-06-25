import { useState } from "react";
import { getStorageItem } from "~/lib/utils";
import { Expense } from "~/types/expense";
import { GetStorageItem } from "~/types/getStorageItemReturn";

export const useGetAllExpenses = () => {
  const [expenseList, setExpenseList] = useState<Expense[] | null>(null);
  const [totalExpenseCount, setTotalExpenseCount] = useState<number>(0);
  const [expensesError, setExpensesError] = useState<string | null>(null);
  const [isExpensesFetching, setIsExpensesFetching] = useState(false);

  const getExpenses = async () => {
    setIsExpensesFetching(true);

    const expenses: GetStorageItem = await getStorageItem("expenses");

    if (expenses.status === "error") {
      if (expenseList !== null) {
        setExpenseList(null);
      }
      setExpensesError("Error fetching expenses");
      setIsExpensesFetching(false);

      return;
    }

    if (expenses.data === null) {
      if (expenseList !== null) {
        setExpenseList(null);
      }
      setIsExpensesFetching(false);

      return;
    }

    setTotalExpenseCount(expenses.data.length);
    setExpenseList(expenses.data);
    setIsExpensesFetching(false);

    if (expensesError !== null) {
      setExpensesError(null);
    }
  };

  const cleanupExpenseStates = () => {
    setExpenseList(null);
    setExpensesError(null);
    setIsExpensesFetching(false);
  };

  return {
    getExpenses,
    cleanupExpenseStates,
    expenseList,
    totalExpenseCount,
    expensesError,
    isExpensesFetching,
  };
};
