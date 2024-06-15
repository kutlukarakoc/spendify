import { useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Button } from "~/components/ui/button";

const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

const barData = [
  { value: 10050, label: "O" },
  { value: 500, label: "Ş" },
  { value: 11222, label: "M" },
  { value: 1000, label: "N" },
  { value: 2000, label: "M" },
  { value: 3000, label: "H" },
  { value: 4400, label: "T" },
  { value: 5100, label: "A" },
  { value: 6300, label: "E" },
  { value: 7500, label: "E" },
  { value: 8000, label: "K" },
  { value: 9000, label: "A" },
];

export const StatisticsByDate = () => {
  const [selectedTime, setSelectedTime] = useState("month");

  return (
    <View className="mt-9">
      <View className="flex-row justify-between items-start">
        <Text className="text-sm mb-7 text-foreground/70 w-1/2 font-medium leading-5">
          Ay, Gün ve Haftaya Göre Harcama İstatistikleri
        </Text>
        <View>
          <View className="w-full bg-primary/10 flex-row rounded-md py-2 px-3">
            <Button
              size="sm"
              onPress={() => setSelectedTime("day")}
              className={
                selectedTime === "day" ? "bg-white h-7" : "bg-transparent h-7"
              }
            >
              <Text
                className={
                  selectedTime === "day"
                    ? "text-primary/60"
                    : "text-foreground/80"
                }
              >
                Gün
              </Text>
            </Button>
            <Button
              size="sm"
              onPress={() => setSelectedTime("week")}
              className={
                selectedTime === "week" ? "bg-white h-7" : "bg-transparent h-7"
              }
            >
              <Text
                className={
                  selectedTime === "week"
                    ? "text-primary/60"
                    : "text-foreground/80"
                }
              >
                Hafta
              </Text>
            </Button>
            <Button
              size="sm"
              onPress={() => setSelectedTime("month")}
              className={
                selectedTime === "month" ? "bg-white h-7" : "bg-transparent h-7"
              }
            >
              <Text
                className={
                  selectedTime === "month"
                    ? "text-primary/60"
                    : "text-foreground/80"
                }
              >
                Ay
              </Text>
            </Button>
          </View>
        </View>
      </View>
      <BarChart
        barWidth={15}
        noOfSections={10}
        barBorderColor="#44A6F4"
        barBorderBottomLeftRadius={0}
        barBorderBottomRightRadius={0}
        barBorderTopLeftRadius={4}
        barBorderTopRightRadius={4}
        barBorderWidth={2}
        frontColor="#B0D5FA"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        spacing={14}
        initialSpacing={16}
        isAnimated
        rulesType="solid"
        rulesColor="#F3F2F2"
      />
    </View>
  );
};
