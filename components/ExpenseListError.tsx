import { Image, View } from "react-native";
import { Text } from "./ui/text";

export const ExpenseListError = () => {
  return (
    <View className="flex-1 flex-col px-4 justify-center">
      <Image
        source={require("~/assets/images/dataCouldntFetch.png")}
        resizeMode="contain"
        className="w-full h-80"
      />
      <Text className="text-center native:text-2xl">
        Beklenmedik bir hata meydana geldi. Lütfen daha sonra tekrar deneyin.
      </Text>
    </View>
  );
};
