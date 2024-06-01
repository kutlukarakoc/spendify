import { Fragment } from "react";
import { ScrollView } from "react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "~/components/ui/select";
import { transformCategoriesToArray } from "~/lib/helpers/transformCategoriesToArr";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TransformedCategory } from "~/lib/helpers/transformCategoriesToArr";

const categoriesArray = transformCategoriesToArray();

export const SelectCategory = ({
  setSelectedCategory,
}: {
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<TransformedCategory | null>
  >;
}) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Select className="w-[45%]">
      <SelectTrigger className="flex-grow bg-primary/20">
        <SelectValue
          className="text-primary text-base native:text-base"
          placeholder="Kategoriler"
        />
      </SelectTrigger>
      <SelectContent
        insets={contentInsets}
        className="w-[200px]"
      >
        <SelectGroup>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categoriesArray.map((category, index) => (
              <Fragment key={category.id}>
                <SelectItem
                  label={category.name}
                  value={category.name}
                  onPress={() => setSelectedCategory(category)}
                />
                {index !== categoriesArray.length - 1 && (
                  <SelectSeparator className="bg-foreground/5" />
                )}
              </Fragment>
            ))}
          </ScrollView>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
