import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { ExpenseFilters } from "~/components/ExpenseFilters";
import { ExpenseListItem } from "~/components/ExpenseListItem";
import { SelectCategory } from "~/components/SelectCategory";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { TransformedCategory } from "~/lib/helpers/transformCategoriesToArr";
import { Search } from "~/lib/icons/Search";
import { useIsFocused } from "@react-navigation/native";
import { useGetExpenses } from "~/hooks/useGetExpenses";

export default function HomeScreen() {
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TransformedCategory | null>(null);

  const {
    getExpenses,
    cleanupExpenseStates,
    expenseList,
    expensesError,
    isExpensesFetching,
  } = useGetExpenses();

  useEffect(() => {
    if (isFocused) {
      getExpenses(searchQuery, selectedCategory);
    } else {
      cleanupExpenseStates();
    }
  }, [isFocused, searchQuery, selectedCategory]);

  if (isExpensesFetching) {
    return (
      <Text className="mt-10 text-center justify-center items-center flex-1 native:text-2xl">
        LOADIGN...
      </Text>
    );
  }

  if (expensesError) {
    return (
      <Text className="mt-10 text-center justify-center items-center flex-1 native:text-2xl">
        {expensesError}
      </Text>
    );
  }

  return (
    <View className="flex-1 px-4">
      <Text className="text-foreground text-lg native:text-lg font-medium">
        Gider Listesi
      </Text>

      <View className="mt-9">
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
      </View>

      <View
        className="mt-6 flex-row justify-between z-[12000]"
        style={{ elevation: 12000 }}
      >
        <SelectCategory setSelectedCategory={setSelectedCategory} />
        <ExpenseFilters />
      </View>

      {expenseList !== null && expenseList.length && (
        <FlatList
          data={expenseList}
          renderItem={({ item: { description, amount, category, date } }) => (
            <ExpenseListItem
              amount={amount}
              category={category}
              description={description}
              date={date}
            />
          )}
          contentContainerStyle={{ gap: 12, marginTop: 24, paddingBottom: 56 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
