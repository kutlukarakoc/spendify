import { ActivityIndicator, View } from "react-native";

export const Loading = () => {
  return (
    <View className="absolute left-0 top-0 right-0 bottom-0 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};
