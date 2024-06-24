import { FlatList, View } from "react-native";
import { ExpenseListItem } from "./ExpenseListItem";
import { ExpenseListSkeleton } from "./ExpenseListSkeleton";
import { Expense } from "~/types/expense";
import { Skeleton } from "./ui/skeleton";

type ExpenseListProps = {
  expenseList: Expense[] | null;
  isExpensesFetching: boolean;
};

export const ExpenseList = ({
  expenseList,
  isExpensesFetching,
}: ExpenseListProps) => {
  if (isExpensesFetching) {
    return <ExpenseListSkeleton />;
  }

  return (
    <FlatList
      contentContainerStyle={{ gap: 12, marginTop: 24 }}
      showsVerticalScrollIndicator={false}
      data={expenseList}
      renderItem={({ item: { description, amount, category, date } }) => (
        <ExpenseListItem
          amount={amount}
          category={category}
          description={description}
          date={date}
        />
      )}
    />
  );
};
