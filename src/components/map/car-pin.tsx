import CarSide from "@/assets/images/car-side.png";
import { CoordinatesDTO } from "@/shared/dtos/coordinates-DTO";
import { sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { MarkerView } from "@rnmapbox/maps";
import { Image, View } from "react-native";

interface CarPinProps {
  data: CoordinatesDTO;
}

export function CarPin({ data }: CarPinProps) {
  return (
    <MarkerView
      id={`car`}
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
            backgroundColor: colors.gray3,
            padding: sizes[2],
            borderRadius: sizes.full,
            zIndex: 10,
          }}
        >
          <Image
            source={CarSide}
            alt="Carro de Lado"
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    </MarkerView>
  );
}
