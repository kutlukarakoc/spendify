import { useState } from "react";
import { View, FlatList } from "react-native";
import { ExpenseFilters } from "~/components/ExpenseFilters";
import { ExpenseListItem } from "~/components/ExpenseListItem";
import { SelectCategory } from "~/components/SelectCategory";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { TransformedCategory } from "~/lib/helpers/transformCategoriesToArr";
import { Search } from "~/lib/icons/Search";
import { expenseList } from "~/mocks/expenseList";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TransformedCategory | null>(null);

  return (
    <View className="flex-1">
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

      <View className="mt-6 flex-row justify-between">
        <SelectCategory setSelectedCategory={setSelectedCategory} />
        <ExpenseFilters />
      </View>

      <FlatList
        data={expenseList}
        renderItem={({ item }) => <ExpenseListItem {...item} />}
        contentContainerStyle={{ gap: 12, marginTop: 24, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}