import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import { Categories } from "~/constants/Categories";
import { useColorScheme } from "~/lib/useColorScheme";
import { hexToRgba } from "~/lib/helpers/hexToRgba";

const pieData = [
  { value: 5, category: "transport" },
  { value: 10, category: "shopping" },
  { value: 10, category: "education" },
  { value: 5, category: "invoice" },
  { value: 20, category: "entertainment" },
  { value: 0, category: "health" },
  { value: 20, category: "food" },
  { value: 30, category: "other" },
];

const formattedPieData = pieData
  .filter((item) => item.value > 0)
  .map((item) => {
    return {
      ...item,
      color: hexToRgba(
        Categories[item.category as keyof typeof Categories].color,
        0.7
      ),
      label: Categories[item.category as keyof typeof Categories].name,
    };
  });

export const StatisticsByCategory = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="w-full min-h-80 p-4 mt-5 mb-14 bg-background rounded-2xl shadow-md shadow-foreground/5">
      <Text className="mb-7 text-foreground/70 font-medium leading-5">
        Kategoriye Göre Harcama İstatistikleri
      </Text>

      <View className="flex-row justify-between items-center gap-10 flex-1">
        <PieChart
          donut
          data={formattedPieData}
          radius={90}
          backgroundColor={isDarkColorScheme ? "#020817" : "white"}
        />

        <View className="justify-center items-stretch flex-1 gap-y-3">
          {formattedPieData.map((item, index) => (
            <View className="flex-row justify-start items-start">
              <View
                className="flex-row justify-start items-start flex-1"
                key={index}
              >
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
