import { shadow, sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "../icon";
import { Text } from "../text";

interface RunDetailsCardProps {
  data: {
    averageSpeed: number;
    distance: number;
    time: string;
    turns: number;
  };
}

export function RunDetailsCard({ data }: RunDetailsCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View
      style={{
        position: "absolute",
        left: sizes[2],
        top: sizes[2],
        zIndex: 10,
        justifyContent: "center",
        ...shadow,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setShowDetails(!showDetails)}
      >
        {showDetails ? (
          <View
            style={{
              borderRadius: sizes[3],
              gap: sizes[1],
              backgroundColor: colors.gray1,
              padding: sizes[2],
            }}
          >
            <Text>Velocidade média: {data.averageSpeed} km/h</Text>
            <Text>Distância: {data.distance} Km</Text>
            <Text>Tempo: {data.time}</Text>
            <Text>Voltas: {data.turns}</Text>
          </View>
        ) : (
          <View
            style={{
              borderRadius: sizes.full,
              backgroundColor: colors.gray1,
              padding: sizes[2],
            }}
          >
            <Icon name="Dashboard" color="secondary" size={sizes[6]} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
