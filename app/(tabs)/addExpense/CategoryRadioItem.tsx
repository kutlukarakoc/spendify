import { Pressable } from "react-native";
import { Label } from "~/components/ui/label";
import { RadioGroupItem } from "~/components/ui/radio-group";

type CategoryRadioItemProps = {
  value: string;
  label: string;
  onPress: () => void;
};

export const CategoryRadioItem = ({ value, label, onPress }: CategoryRadioItemProps) => {
  return (
    <Pressable className={"flex-row gap-2 items-center min-w-28"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onPress}>{label}</Label>
    </Pressable>
  );
};
