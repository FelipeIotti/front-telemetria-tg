import { colors } from "@/shared/theme/colors";
import { View } from "react-native";
import { Text } from "./text";

interface CardDataProps {
  pressValue: number | undefined;
  tiresValue: number | undefined;
  titleDirection: "Left" | "Right";
  change: boolean;
}

export function CardTiresData({
  pressValue,
  tiresValue,
  titleDirection,
  change,
}: CardDataProps) {
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
          <Text fontColor="secondary" fontSize="xl" fontWeight="heading">
            {change ? tiresValue : pressValue}
          </Text>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          alignItems: titleDirection === "Right" ? "flex-end" : "flex-start",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 8,
            marginRight: titleDirection === "Right" ? 10 : 0,
            marginLeft: titleDirection === "Left" ? 10 : 0,
          }}
        >
          <Text
            fontColor={!change ? "gray2" : "secondary"}
            fontSize="lg"
            fontWeight="heading"
          >
            Psi
          </Text>
          <Text fontColor={"secondary"} fontSize="lg" fontWeight="heading">
            {" / "}
          </Text>
          <Text
            fontColor={change ? "gray2" : "secondary"}
            fontSize="lg"
            fontWeight="heading"
          >
            ºC
          </Text>
        </View>
      </View>
    </View>
  );
}
