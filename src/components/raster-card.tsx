import { colors } from "@/shared/theme/colors";
import { View } from "react-native";
import { Text } from "./text";

interface RasterCardProps {
  text: string;
  isActive: boolean | undefined;
}

export function RasterCard({ text, isActive }: RasterCardProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 2,
        borderColor: colors.gray2,
        borderRadius: 8,
        paddingLeft: 16,
        paddingVertical: 16,
      }}
    >
      <View
        style={{
          height: 8,
          width: 8,
          borderRadius: 999,
          backgroundColor: !isActive ? colors.red : colors.green,
        }}
      />
      <View
        style={{
          height: 24,
          width: 2,
          marginHorizontal: 16,
          backgroundColor: colors.gray2,
        }}
      />
      <Text fontColor="white">{text}</Text>
    </View>
  );
}
