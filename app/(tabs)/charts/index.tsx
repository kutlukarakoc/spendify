import { useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { StatisticsByCategory } from "~/components/StatisticsByCategory";
import { StatisticsByDate } from "~/components/StatisticsByDate";
import { useIsFocused } from "@react-navigation/native";
import { useGetAllExpenses } from "~/hooks/useGetAllExpenses";

export default function ChartsScreen() {
  const isFocused = useIsFocused();

  const {
    getExpenses,
    cleanupExpenseStates,
    expenseList,
    totalExpenseCount,
    expensesError,
    isExpensesFetching,
  } = useGetAllExpenses();

  useEffect(() => {
    if (isFocused) {
      getExpenses();
    } else {
      cleanupExpenseStates();
    }
  }, [isFocused]);

  if (isExpensesFetching) {
    return <Text>loading..</Text>;
  }

  if (expensesError) {
    return <Text>Hata</Text>;
  }

  if (expenseList === null) {
    return <Text>Veri yok</Text>;
  }

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <Text className="text-foreground text-lg native:text-lg font-medium mb-9">
        Harcama Analizi
      </Text>

      <StatisticsByDate />
      <StatisticsByCategory expenseList={expenseList} />
    </ScrollView>
  );
}
