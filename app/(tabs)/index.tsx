import { useState, useEffect } from "react";
import { View } from "react-native";
import { ExpenseFilters } from "~/components/ExpenseFilters";
import { ExpenseList } from "~/components/ExpenseList";
import { SelectCategory } from "~/components/SelectCategory";
import { Input } from "~/components/ui/input";
import { TransformedCategory } from "~/lib/helpers/transformCategoriesToArr";
import { Search } from "~/lib/icons/Search";
import { useIsFocused } from "@react-navigation/native";
import { useGetExpenses } from "~/hooks/useGetExpenses";
import { Pagination } from "~/components/Pagination";
import { ExpenseListError } from "~/components/ExpenseListError";
import { ExpenseListNoData } from "~/components/ExpenseListNoData";

const ITEMS_PER_PAGE = 5;

export default function HomeScreen() {
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TransformedCategory | null>(null);

  const [page, setPage] = useState(1);

  const {
    getExpenses,
    cleanupExpenseStates,
    expenseList,
    totalExpenseCount,
    expensesError,
    isExpensesFetching,
  } = useGetExpenses(ITEMS_PER_PAGE);

  useEffect(() => {
    if (isFocused) {
      getExpenses(searchQuery, selectedCategory, page);
    } else {
      cleanupExpenseStates();
    }
  }, [isFocused, searchQuery, selectedCategory, page]);

  if (expensesError) {
    return <ExpenseListError />;
  }

  if (!isExpensesFetching && expenseList === null && !expensesError) {
    return <ExpenseListNoData />;
  }

  return (
    <View className="flex-1 px-4">
      <View className="relative">
        <Search
          className="text-foreground/60 absolute z-10 left-4 top-4"
          size={21}
        />
        <Input
          placeholder="Ara..."
          className="native:h-14 pl-12 border-2"
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
        />
      </View>

      <View
        className="mt-6 flex-row justify-between z-[12000]"
        style={{ elevation: 12000 }}
      >
        <SelectCategory setSelectedCategory={setSelectedCategory} />
        <ExpenseFilters />
      </View>

      <ExpenseList
        expenseList={expenseList}
        isExpensesFetching={isExpensesFetching}
      />

      {totalExpenseCount > 5 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalCount={totalExpenseCount}
          perPage={ITEMS_PER_PAGE}
        />
      )}
    </View>
  );
}
