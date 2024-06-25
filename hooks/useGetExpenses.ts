import { useState } from "react";
import { TransformedCategory } from "~/lib/helpers/transformCategoriesToArr";
import { getStorageItem } from "~/lib/utils";
import { Expense } from "~/types/expense";
import { GetStorageItem } from "~/types/getStorageItemReturn";

export const useGetExpenses = (perPage: number, getAll?: boolean) => {
  const [expenseList, setExpenseList] = useState<Expense[] | null>(null);
  const [totalExpenseCount, setTotalExpenseCount] = useState<number>(0);
  const [expensesError, setExpensesError] = useState<string | null>(null);
  const [isExpensesFetching, setIsExpensesFetching] = useState(false);

  const getExpenses = async (
    searchQuery: string,
    selectedCategory: TransformedCategory | null,
    page: number
  ) => {
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

    if (getAll) {
      setTotalExpenseCount(expenses.data.length);
      setExpenseList(expenses.data);
      setIsExpensesFetching(false);
      if (expensesError !== null) {
        setExpensesError(null);
      }
      return;
    }

    const filteredExpenses = filterExpenses(
      expenses.data,
      searchQuery,
      selectedCategory
    );

    setTotalExpenseCount(filteredExpenses.length);

    const paginatedExpenses = filteredExpenses.slice(
      (page - 1) * perPage,
      page * perPage
    );

    setExpenseList(paginatedExpenses);
    setIsExpensesFetching(false);
    if (expensesError !== null) {
      setExpensesError(null);
    }
  };

  const filterExpenses = (
    expenses: Expense[],
    searchQuery: string,
    selectedCategory: TransformedCategory | null
  ) => {
    let filteredExpenses = expenses;

    if (searchQuery.length > 0) {
      filteredExpenses = filteredExpenses.filter((expense: Expense) =>
        expense.description
          .toLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      );
    }

    if (selectedCategory !== null) {
      filteredExpenses = filteredExpenses.filter(
        (expense: Expense) => expense.category === selectedCategory.id
      );
    }

    return filteredExpenses;
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
