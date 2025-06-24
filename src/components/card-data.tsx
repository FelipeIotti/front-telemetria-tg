import { colors } from "@/shared/theme/colors";
import { View } from "react-native";
import { Text } from "./text";

interface CardDataProps {
  value: number | undefined;
  type: "Km/h" | "Rpm" | "/4" | "ºC" | "Psi/ºC";
}

export function CardData({ value, type }: CardDataProps) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
          borderWidth: 2,
          borderColor: colors.secondary,
          position: "relative",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text fontColor="gray3" fontSize="xl" fontWeight="heading">
            {String(value)}
          </Text>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: 12,
          paddingBottom: 8,
        }}
      >
        <Text fontColor="gray3" fontSize="lg" fontWeight="heading">
          {type}
        </Text>
      </View>
    </View>
  );
}
