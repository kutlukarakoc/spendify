import { Text, ScrollView } from "react-native";
import { StatisticsByCategory } from "~/components/StatisticsByCategory";
import { StatisticsByDate } from "~/components/StatisticsByDate";

export default function ChartsScreen() {
  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <Text className="text-foreground text-lg native:text-lg font-medium mb-9">
        Harcama Analizi
      </Text>

      <StatisticsByDate />
      <StatisticsByCategory />
    </ScrollView>
  );
}
