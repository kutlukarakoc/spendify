import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Categories } from "~/constants/Categories";
import { Colors } from "~/constants/Colors";
import { hexToRgba } from "~/lib/helpers/hexToRgba";
import dayjs from "dayjs";

type ExpenseListItemProps = {
  description: string;
  amount: number;
  category: string;
  date: number;
};

export const ExpenseListItem = ({
  description,
  amount,
  category,
  date,
}: ExpenseListItemProps) => {
  const selectedCategory = Categories[category as keyof typeof Categories];

  const formattedDate = dayjs(date * 1000).format("DD/MM/YYYY");

  return (
    <View className="flex-row items-center justify-between border border-foreground/10 rounded-xl px-3 h-[83px]">
      <View className="flex-row">
        <View
          className="border-2 rounded-full w-[52px] h-[52px] items-center justify-center mr-3"
          style={{
            backgroundColor: hexToRgba(selectedCategory.color, 0.3),
            borderColor: selectedCategory.color,
          }}
        >
          <Ionicons
            name={selectedCategory.icon}
            color={selectedCategory.color}
            size={28}
          />
        </View>
        <View>
          <Text className="text-foreground font-semibold text-base native:text-base">
            {selectedCategory.name}
          </Text>
          <Text
            className="text-foreground/65 mt-1 text-sm native:text-sm w-[105px]"
            numberOfLines={1}
          >
            {description}
          </Text>
        </View>
      </View>

      <Text
        className="text-foreground/55 text-base native:text-base"
        numberOfLines={1}
      >
        {formattedDate}
      </Text>

      <Text
        className="text-primary text-base native:text-base"
        numberOfLines={1}
      >
        {amount} ₺
      </Text>

      <Ionicons name="chevron-forward" color={Colors["blue-500"]} size={22} />
    </View>
  );
};
