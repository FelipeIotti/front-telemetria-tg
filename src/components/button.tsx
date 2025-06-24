import { buttonSizes, sizes } from "@/shared/theme";

import { colors } from "@/shared/theme/colors";
import { Colors } from "@/shared/theme/types/color-types";
import {
  ActivityIndicator,
  AnimatableNumericValue,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Icon, IconNameType } from "./icon";
import { Text } from "./text";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  icon?: IconNameType;
  type?: Colors;
  size?: "sm" | "md";
  isOutlined?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  borderRadius?: AnimatableNumericValue;
  textButtonColor?: Colors;
}

export function Button({
  text,
  icon,
  type = "primary",
  size = "md",
  isOutlined = false,
  isLoading = false,
  isDisabled = false,
  borderRadius = 10,
  textButtonColor,
  style,
  ...rest
}: ButtonProps) {
  const customStyle = {
    backgroundColor: isOutlined ? "transparent" : colors[type],
    opacity: isDisabled || isLoading ? 0.6 : 1,
    paddingVertical: buttonSizes[size],
    paddingHorizontal: sizes[4],
    borderWidth: 2,
    borderColor: colors[type],
    borderRadius,
  };

  return (
    <TouchableOpacity
      style={[style, customStyle]}
      activeOpacity={0.6}
      disabled={isLoading || isDisabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={isOutlined ? colors[type] : colors.secondary}
          size={"small"}
        />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {icon && <Icon name={icon} size={sizes[4]} color="white" />}

          <Text
            fontColor={textButtonColor ?? (isOutlined ? type : "white")}
            fontSize={size}
            fontWeight="heading"
            style={{
              opacity: customStyle.opacity,
            }}
          >
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
