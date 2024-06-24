import { View } from "react-native";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { Ionicons } from "@expo/vector-icons";

type PaginationProps = {
  totalCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
};

export const Pagination = ({
  totalCount,
  page,
  setPage,
  perPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <View className="flex-row justify-center items-center">
      <Button
        size="icon"
        variant="ghost"
        onPress={() => setPage((page) => (page > 1 ? page - 1 : 1))}
        className={page > 1 ? "visible" : "invisible"}
      >
        <Ionicons name="chevron-back" size={18} color="#0077EE" />
      </Button>

      <View className="flex-row gap-x-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            size="icon"
            onPress={() => setPage(index + 1)}
            className={
              index + 1 === page
                ? "bg-primary/20 rounded-full h-6 w-6"
                : "bg-transparent w-6 h-6"
            }
          >
            <Text
              className={
                index + 1 === page
                  ? "text-primary font-semibold"
                  : "text-black font-semibold"
              }
            >
              {index + 1}
            </Text>
          </Button>
        ))}
      </View>

      <Button
        size="icon"
        variant="ghost"
        onPress={() =>
          setPage((page) => (page < totalPages ? page + 1 : totalPages))
        }
        className={page < totalPages ? "visible" : "invisible"}
      >
        <Ionicons name="chevron-forward" size={18} color="#0077EE" />
      </Button>
    </View>
  );
};
