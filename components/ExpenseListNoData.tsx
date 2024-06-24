import { Image, View } from "react-native";
import { Text } from "./ui/text";

export const ExpenseListNoData = () => {
  return (
    <View className="flex-1 flex-col px-4 justify-center">
      <Image
        source={require("~/assets/images/payment.gif")}
        resizeMode="contain"
        className="w-full h-80 rounded-xl"
      />
      <Text className="mt-10 text-center native:text-2xl">
        Henüz harcama eklemediniz.
      </Text>
      <Text className="mt-5 text-center native:text-lg">
        Harcama eklemek için alt tarafta bulunan butonlardan ortadakine
        tıklayın.
      </Text>
    </View>
  );
};
