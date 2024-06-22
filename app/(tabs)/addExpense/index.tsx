import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Loading } from "./Loading";
import { CategoryRadioItem } from "./CategoryRadioItem";
import { ErrorText } from "./ErrorText";
import { RequiredMark } from "./RequiredMark";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup } from "~/components/ui/radio-group";
import { getStorageItem, setStorageItem } from "~/lib/utils";
import { transformCategoriesToArray } from "~/lib/helpers/transformCategoriesToArr";
import { useColorScheme } from "~/lib/useColorScheme";
import { addExpenseSchema } from "~/lib/schemas/addExpenseSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "dayjs/locale/tr";
import dayjs from "dayjs";

type AddExpenseForm = {
  spendTo: string;
  description: string;
  category: string;
  amount: string;
  date: DateType;
  note: string;
};

export default function AddExpenseScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const calenderTextsColor = isDarkColorScheme
    ? { color: "#fff" }
    : { color: "#000" };

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      spendTo: "",
      description: "",
      category: "other",
      amount: "",
      date: dayjs(),
      note: "",
    },
    resolver: zodResolver(addExpenseSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: AddExpenseForm) => {
    setIsSubmitting(true);

    const expenses = await getStorageItem("expenses");

    if (expenses.status === "error") {
      setIsSubmitting(false);
      Alert.alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      return;
    }

    const expensesArr = expenses.data !== null ? expenses.data : [];
    const newExpense = {
      ...data,
      date: dayjs(data.date).unix(),
      amount: Number(data.amount),
      id: Date.now(),
    };
    const updatedExpenses = [newExpense, ...expensesArr];

    const result = await setStorageItem("expenses", updatedExpenses);
    if (result === "error") {
      setIsSubmitting(false);
      Alert.alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      return;
    }

    setIsSubmitting(false);
    Alert.alert("Gider başarıyla eklendi.");

    reset();
  };

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <Text className="text-foreground text-lg native:text-lg font-medium">
        Gider Kaydı
      </Text>

      <View className="flex-col gap-y-7 mt-9">
        <View className="gap-y-2">
          <Label className="text-foreground font-normal" nativeID="spendTo">
            Alıcı/Satıcı
          </Label>
          <Controller
            control={control}
            name="spendTo"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                className="native:h-12 px-4 border-2 text-sm native:text-sm"
                placeholder="Alıcı veya satıcı ismi giriniz"
                aria-labelledby="spendTo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>

        <View className="gap-y-2">
          <Label className="text-foreground font-normal" nativeID="description">
            Gider Adı <RequiredMark />
          </Label>
          <Controller
            control={control}
            name="description"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <Input
                  className="native:h-12 px-4 border-2 text-sm native:text-sm"
                  placeholder="Gider adı giriniz"
                  aria-labelledby="description"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error?.message && <ErrorText message={error.message} />}
              </>
            )}
          />
        </View>

        <View className="gap-y-2 px-1">
          <Label nativeID="category" className="text-foreground font-normal">
            Kategori <RequiredMark />
          </Label>
          <Controller
            control={control}
            name="category"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <RadioGroup
                  value={value}
                  onValueChange={onChange}
                  className="flex-wrap flex-row gap-3"
                >
                  {transformCategoriesToArray().map((category) => (
                    <CategoryRadioItem
                      key={category.id}
                      value={category.id}
                      label={category.name}
                      onPress={() => onChange(category.id)}
                    />
                  ))}
                </RadioGroup>
                {error?.message && <ErrorText message={error.message} />}
              </>
            )}
          />
        </View>

        <View className="gap-y-2">
          <Label className="text-foreground font-normal" nativeID="amount">
            Gider Tutarı <RequiredMark />
          </Label>
          <Controller
            control={control}
            name="amount"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <Input
                  className="native:h-12 px-4 border-2 text-sm native:text-sm"
                  placeholder="Gider tutarı giriniz"
                  aria-labelledby="amount"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error?.message && <ErrorText message={error.message} />}
              </>
            )}
          />
        </View>

        <View className="gap-y-2">
          <Label
            className="text-foreground font-normal"
            nativeID="expense-date"
          >
            Tarih <RequiredMark />
          </Label>
          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <DateTimePicker
                  mode="single"
                  locale="tr"
                  onChange={({ date }) => onChange(date)}
                  date={value}
                  headerButtonColor={isDarkColorScheme ? "#fff" : "#000"}
                  headerTextStyle={calenderTextsColor}
                  todayTextStyle={calenderTextsColor}
                  weekDaysTextStyle={calenderTextsColor}
                  calendarTextStyle={calenderTextsColor}
                />
                {error?.message && <ErrorText message={error.message} />}
              </>
            )}
          />
        </View>

        <View className="gap-y-2">
          <Label className="text-foreground font-normal" nativeID="note">
            Not
          </Label>
          <Controller
            control={control}
            name="note"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                className="native:h-36 px-4 border-2 text-sm native:text-sm"
                multiline
                placeholder="Giderle ilgili bir not ekleyin"
                aria-labelledby="note"
                numberOfLines={8}
                style={{ textAlignVertical: "top" }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
      </View>

      <Button className="mt-9 mb-14" onPress={handleSubmit(onSubmit)}>
        <Text className="text-white">Kaydet</Text>
      </Button>

      {isSubmitting && <Loading />}
    </ScrollView>
  );
}
