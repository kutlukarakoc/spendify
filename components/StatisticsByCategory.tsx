import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { Expense } from "~/types/expense";
import { calculateExpenses } from "~/lib/helpers/calculateExpenses";

type StatisticsByCategoryProps = {
  expenseList: Expense[];
};

export const StatisticsByCategory = ({
  expenseList,
}: StatisticsByCategoryProps) => {
  const { isDarkColorScheme } = useColorScheme();

  const pieData = calculateExpenses(expenseList);

  return (
    <View className="w-full min-h-80 p-4 mt-5 bg-background rounded-2xl shadow-md shadow-foreground/5">
      <Text className="mb-7 text-foreground/70 font-medium leading-5">
        Kategoriye Göre Harcama İstatistikleri
      </Text>

      <View className="flex-row justify-between items-center gap-10 flex-1">
        <PieChart
          donut
          data={pieData}
          radius={90}
          backgroundColor={isDarkColorScheme ? "#020817" : "white"}
        />

        <View className="justify-center items-stretch flex-1 gap-y-3">
          {pieData.map((item, index) => (
            <View key={index} className="flex-row justify-start items-start">
              <View className="flex-row justify-start items-start flex-1">
                <View
                  className="w-4 h-4 rounded-sm mr-2"
                  style={{ backgroundColor: item.color }}
                ></View>
                <Text className="text-foreground">{item.label}</Text>
              </View>
              <Text className="text-foreground">%{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
