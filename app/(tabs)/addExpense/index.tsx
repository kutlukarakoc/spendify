import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { transformCategoriesToArray } from "~/lib/helpers/transformCategoriesToArr";

export default function AddExpenseScreen() {
  const [category, setCategory] = useState("");

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <Text className="text-foreground text-lg native:text-lg font-medium">
        Gider Kaydı
      </Text>

      <View className="flex-col gap-y-5 mt-9">
        <View className="gap-y-2">
          <Label
            className="text-foreground font-normal"
            nativeID="seller-buyer"
          >
            Alıcı/Satıcı
          </Label>
          <Input
            className="native:h-12 px-4 border-2 text-sm native:text-sm"
            placeholder="Alıcı veya satıcı ismi giriniz"
            aria-labelledby="seller-buyer"
          />
        </View>

        <View className="gap-y-2">
          <Label
            className="text-foreground font-normal"
            nativeID="expense-name"
          >
            Gider Adı
          </Label>
          <Input
            className="native:h-12 px-4 border-2 text-sm native:text-sm"
            placeholder="Gider adı giriniz"
            aria-labelledby="expense-name"
          />
        </View>

        <View className="gap-y-2 px-1">
          <Label nativeID="category" className="text-foreground font-normal">
            Kategori
          </Label>
          <RadioGroup
            value={category}
            onValueChange={setCategory}
            className="flex-wrap flex-row gap-3"
          >
            {transformCategoriesToArray().map((category) => (
              <CategoryRadioItem
                key={category.id}
                value={category.id}
                label={category.name}
                onLabelPress={() => setCategory(category.id)}
              />
            ))}
          </RadioGroup>
        </View>

        <View className="gap-y-2">
          <Label
            className="text-foreground font-normal"
            nativeID="expense-amount"
          >
            Gider Tutarı
          </Label>
          <Input
            className="native:h-12 px-4 border-2 text-sm native:text-sm"
            placeholder="Gider tutarı giriniz"
            aria-labelledby="expense-amount"
            keyboardType="numeric"
          />
        </View>

        {/* YENİ TARİH COMP EKLENİCEK */}
        <View className="gap-y-2">
          <Label
            className="text-foreground font-normal"
            nativeID="expense-date"
          >
            Tarih
          </Label>
          <Input
            className="native:h-12 px-4 border-2 text-sm native:text-sm"
            placeholder="Gider tarihi giriniz"
            aria-labelledby="expense-date"
          />
        </View>

        <View className="gap-y-2">
          <Label
            className="text-foreground font-normal"
            nativeID="expense-note"
          >
            Not
          </Label>
          <Input
            className="native:h-36 px-4 border-2 text-sm native:text-sm"
            multiline
            placeholder="Giderle ilgili bir not ekleyin"
            aria-labelledby="expense-note"
            numberOfLines={8}
            style={{ textAlignVertical: "top" }}
          />
        </View>
      </View>

      <Button className="mt-9 mb-14">
        <Text className="text-white">Kaydet</Text>
      </Button>
    </ScrollView>
  );
}

function CategoryRadioItem({
  value,
  onLabelPress,
  label,
}: {
  value: string;
  onLabelPress: () => void;
  label: string;
}) {
  return (
    <View className={"flex-row gap-2 items-center min-w-28"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {label}
      </Label>
    </View>
  );
}
