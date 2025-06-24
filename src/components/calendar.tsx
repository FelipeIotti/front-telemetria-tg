import { colors } from "@/shared/theme/colors";
import { Dimensions } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

interface CalendarProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function Calendar({ date, setDate }: CalendarProps) {
  const { width } = Dimensions.get("window");

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const itemWidth = 0.8 * width;

  return (
    <CalendarPicker
      width={itemWidth}
      weekdays={weekDays}
      months={months}
      disabledDatesTextStyle={{
        color: colors.gray3,
      }}
      todayBackgroundColor={colors.gray4}
      selectedDayColor={colors.secondary}
      selectedDayTextColor={colors.gray1}
      selectMonthTitle={"Selecione o mês"}
      selectYearTitle={"Selecione o ano"}
      textStyle={{
        fontFamily: "Roboto",
        color: colors.gray2,
        fontSize: 14,
      }}
      previousTitle={"voltar"}
      nextTitle={"próximo"}
      onDateChange={(date: Date) => setDate(date)}
      selectedStartDate={date}
    />
  );
}
