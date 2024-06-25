import { Categories } from "~/constants/Categories";
import { hexToRgba } from "./hexToRgba";
import { Expense } from "~/types/expense";

export const calculateExpenses = (expenseList: Expense[]) => {
  const totalExpense = expenseList.reduce((acc, curr) => acc + curr.amount, 0);

  const categoryExpenses = expenseList.reduce<{ [key: string]: number }>(
    (acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    },
    {}
  );

  const pieData = Object.entries(categoryExpenses).map(
    ([category, amount]) => ({
      category,
      value: Number(((amount / totalExpense) * 100).toFixed(2)),
      color: hexToRgba(
        Categories[category as keyof typeof Categories].color,
        0.75
      ),
      label: Categories[category as keyof typeof Categories].name,
    })
  );

  return pieData;
};
