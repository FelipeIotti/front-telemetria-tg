import { Icon } from "@/components/icon";

import { OptionsDTO } from "@/shared/dtos/options-DTO";
import { sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../text";
import { SelectItem } from "./select-item";
import { SelectModal } from "./select-modal";

interface InputProps {
  label: string;
  placeholder?: string;
  options: OptionsDTO[];
  onChange?: (value: OptionsDTO) => void;
  value?: OptionsDTO;
}

export function InputSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: InputProps) {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function handleSelect(value: OptionsDTO) {
    onChange && onChange(value);
    setShow(false);
    setIsFocused(false);
  }

  return (
    <View
      style={{
        gap: sizes[1],
        width: "60%",
      }}
    >
      <Text fontSize="sm" fontColor="secondary" fontWeight="heading">
        {label}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          setIsFocused(true);
          setShow(true);
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderRadius: sizes[2],
          borderColor: isFocused ? colors.secondary : colors.gray4,
          padding: sizes[4],
        }}
      >
        <Text fontColor="gray3" truncated style={{ marginRight: sizes[4] }}>
          {value?.label ?? placeholder}
        </Text>

        <Icon name="ArrowDown" color="gray3" size={sizes[3]} />
      </TouchableOpacity>

      <SelectModal show={show} setShow={setShow}>
        <View
          style={{
            gap: sizes[1],
          }}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              selected={value?.value === option.value}
              onSelect={() => handleSelect(option)}
              item={option}
            />
          ))}
        </View>
      </SelectModal>
    </View>
  );
}
