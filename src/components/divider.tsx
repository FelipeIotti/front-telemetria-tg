import { colors } from "@/shared/theme/colors";
import { Colors } from "@/shared/theme/types/color-types";
import { View, ViewProps, ViewStyle } from "react-native";

interface DividerProps extends ViewProps {
  color?: Colors;
  width?: "1" | "2" | "3" | "4";
  orientation?: "horizontal" | "vertical";
}
export function Divider({
  color = "gray4",
  width = "1",
  orientation = "horizontal",
  style,
  ...rest
}: DividerProps) {
  const customStyles: ViewStyle = {
    width: orientation === "horizontal" ? "100%" : Number(width),
    height: orientation === "horizontal" ? Number(width) : "100%",
    backgroundColor: colors[color],
  };

  return <View style={[customStyles, style]} {...rest}></View>;
}
