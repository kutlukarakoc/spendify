import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { BottomSheet } from "~/components/BottomSheet";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Filter } from "~/lib/icons/Filter";
import dayjs from "dayjs";
import "dayjs/locale/tr";

export const ExpenseFilters = () => {
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const formattedStartDate = range.startDate
    ? dayjs(range.startDate).format("DD-MM-YY").replaceAll("-", ".")
    : null;
  const formattedEndDate = range.endDate
    ? dayjs(range.endDate).format("DD-MM-YY").replaceAll("-", ".")
    : null;
  const fullDate =
    formattedStartDate && formattedEndDate
      ? `${formattedStartDate} - ${formattedEndDate}`
      : null;

  return (
    <>
      <Button
        size="lg"
        className="flex-row items-center gap-2 w-[45%]"
        onPress={() => setVisible(!visible)}
      >
        <Filter className="text-white" size={20} strokeWidth={1.5} />
        <Text className="text-white">Filtrele</Text>
      </Button>

      <BottomSheet visible={visible} setVisible={setVisible}>
        <View className="justify-center items-center px-4">
          <Accordion
            type="multiple"
            collapsible
            className="w-full max-w-sm native:max-w-md"
          >
            <AccordionItem value="date-picker" className="mb-10">
              <AccordionTrigger>
                <Text className="text-foreground text-base native:text-base font-normal">
                  {fullDate ? fullDate : "Tarih Aralığına Göre"}
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <DateTimePicker
                  mode="range"
                  locale="tr"
                  startDate={range.startDate}
                  endDate={range.endDate}
                  onChange={({ endDate, startDate }) =>
                    setRange({ startDate, endDate })
                  }
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <View className="w-full">
            <Text className="mb-4 text-foreground text-base native:text-base font-normal">
              Ödeme Yöntemi
            </Text>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="gap-3 flex-row justify-between"
            >
              <RadioItem
                value="Nakit"
                onLabelPress={() => setPaymentMethod("Nakit")}
              />
              <RadioItem
                value="Kart"
                onLabelPress={() => setPaymentMethod("Kart")}
              />
              <RadioItem
                value="Havale"
                onLabelPress={() => setPaymentMethod("Havale")}
              />
            </RadioGroup>
          </View>

          <View className="w-full mt-10">
            <Text className="text-foreground text-base font-normal mb-4">
              Fiyat Aralığı
            </Text>
            <View className="flex-row w-full gap-x-6">
              <Input
                placeholder="Minimum tutar"
                className="flex-1 rounded-md text-base native:text-base placeholder:text-base"
                value={minAmount}
                onChangeText={setMinAmount}
                keyboardType="numeric"
              />
              <Input
                placeholder="Maksimum tutar"
                className="flex-1 rounded-md text-base native:text-base placeholder:text-base"
                value={maxAmount}
                onChangeText={setMaxAmount}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Button className="w-full mt-12">
            <Text className="text-white">Filtreleri Uygula</Text>
          </Button>
        </View>
      </BottomSheet>
    </>
  );
};

function RadioItem({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}
