import { View } from "react-native";
import { Skeleton } from "./ui/skeleton";

export const ExpenseListSkeleton = () => {
  return (
    <View className="gap-y-3 mt-6 mb-[32.3px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <View
          key={index}
          className="flex-row items-center justify-between border border-foreground/10 rounded-xl px-3 h-[83px]"
        >
          <View className="flex-row">
            <Skeleton className="rounded-full w-[52px] h-[52px] mr-3"></Skeleton>
            <View>
              <Skeleton className="w-16 h-5 rounded-md"></Skeleton>
              <Skeleton className="mt-1 w-[105px] h-4 rounded-md"></Skeleton>
            </View>
          </View>

          <Skeleton className="w-24 h-4 rounded-md"></Skeleton>
          <Skeleton className="w-16 h-4 rounded-md"></Skeleton>
        </View>
      ))}
    </View>
  );
};
