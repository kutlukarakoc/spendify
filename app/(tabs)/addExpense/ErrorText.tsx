import { Text } from "react-native";

export const ErrorText = ({ message }: { message: string }) => {
  return <Text className="text-red-500 native:text-sm">{message}</Text>;
};
