import { colors } from "@/shared/theme/colors";
import { Colors } from "@/shared/theme/types/color-types";
import { ActivityIndicator, View, ViewProps } from "react-native";

interface LoadingProps extends ViewProps {
  size?: "small" | "large";
  color?: Colors;
}

export function Loading({
  size = "small",
  color = "secondary",
  style,
  ...rest
}: LoadingProps) {
  return (
    <View {...rest}>
      <ActivityIndicator color={colors[color]} size={size} />
    </View>
  );
}
