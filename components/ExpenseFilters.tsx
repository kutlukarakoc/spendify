import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Text } from "~/components/ui/text";
import { Filter } from "~/lib/icons/Filter";
import { Dimensions, View, ScrollView } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import "dayjs/locale/tr";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export const ExpenseFilters = () => {
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  console.log("minAmount", minAmount);

  return (
    <Dialog className="w-[45%]">
      <DialogTrigger asChild>
        <Button size="lg" className="flex-row items-center gap-2">
          <Filter className="text-white" size={20} strokeWidth={1.5} />
          <Text className="text-white">Filtrele</Text>
        </Button>
      </DialogTrigger>
      <DialogContent style={{ width: Dimensions.get("window").width - 40 }}>
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-lg native:text-lg">
            Filtreler
          </DialogTitle>
        </DialogHeader>
        <ScrollView
          style={{ height: 340 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="justify-center items-center mt-10">
            <Accordion
              type="multiple"
              collapsible
              className="w-full max-w-sm native:max-w-md"
            >
              <AccordionItem value="date-picker" className="mb-10">
                <AccordionTrigger>
                  <Text className="text-foreground text-base native:text-base font-normal">
                    Tarih Aralığına Göre
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
              <AccordionItem value="payment-method">
                <AccordionTrigger>
                  <Text className="text-foreground text-base native:text-base font-normal">
                    Ödeme Yöntemi
                  </Text>
                </AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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

            
          </View>
        </ScrollView>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text className="text-white">Filtreleri Uygula</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
