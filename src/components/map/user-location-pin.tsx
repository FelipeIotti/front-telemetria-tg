import { useMap } from "@/hooks/use-map";
import { shadow, sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { MarkerView } from "@rnmapbox/maps";
import { View } from "react-native";
import { Icon } from "../icon";

export function UserLocationPin() {
  const { selectedLocation } = useMap();

  return (
    selectedLocation && (
      <MarkerView
        id="userLocation"
        coordinate={[selectedLocation.longitude, selectedLocation.latitude]}
      >
        <View style={{ alignItems: "center", ...shadow }}>
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
                padding: 4,
                borderRadius: sizes.full,
                zIndex: 10,
              }}
            >
              <Icon name="UserLine" color="secondary" />
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.secondary,
              width: sizes[4],
              height: sizes[4],
              marginTop: -14,
              transform: [{ rotate: "45deg" }],
            }}
          />
        </View>
      </MarkerView>
    )
  );
}
