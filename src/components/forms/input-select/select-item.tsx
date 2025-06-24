import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { OptionsDTO } from "@/shared/dtos/options-DTO";
import { sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { TouchableOpacity, View } from "react-native";

interface SelectItemProps {
  selected: boolean;
  item: OptionsDTO;
  onSelect: () => void;
}

export function SelectItem({ selected, item, onSelect }: SelectItemProps) {
  return (
    <TouchableOpacity
      key={item.value}
      style={{
        flexDirection: "row",
        padding: sizes[2],
        alignItems: "center",
        justifyContent: "space-between",
        ...(selected && {
          height: "auto",
          width: "auto",
          backgroundColor: colors.gray2,
          borderRadius: sizes[2],
        }),
      }}
      activeOpacity={0.6}
      onPress={onSelect}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: sizes[2],
        }}
      >
        {item.iconName && <Icon name={item.iconName} color={item.iconColor} />}
        <Text fontWeight={selected ? "heading" : "body"}>{item.label}</Text>
      </View>
      {selected && <Icon name="CheckFill" color="secondary" size={sizes[4]} />}
    </TouchableOpacity>
  );
}
