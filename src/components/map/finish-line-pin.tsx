import { CoordinatesDTO } from "@/shared/dtos/coordinates-DTO";
import { sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { MarkerView } from "@rnmapbox/maps";
import { View } from "react-native";
import { Icon } from "../icon";

interface FinishLinePinProps {
  data: CoordinatesDTO;
}

export function FinishLinePin({ data }: FinishLinePinProps) {
  return (
    <MarkerView
      id={`FinishLine`}
      coordinate={[Number(data.longitude), Number(data.latitude)]}
    >
      <View
        style={{
          backgroundColor: colors.secondary,
          padding: 2,
          borderRadius: sizes.full,
          zIndex: 10,
        }}
      >
        <View
          style={{
            backgroundColor: colors.gray1,
            padding: sizes[2],
            borderRadius: sizes.full,
            zIndex: 10,
          }}
        >
          <Icon name="Flag" size={sizes[6]} color="secondary" />
        </View>
      </View>
    </MarkerView>
  );
}
