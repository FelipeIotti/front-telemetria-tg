import { shadow, sizes } from "@/shared/theme";

import { useMap } from "@/hooks/use-map";
import { colors } from "@/shared/theme/colors";
import { Camera } from "@rnmapbox/maps";
import { RefObject } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "../icon";

interface UserLocationButtonProps {
  cameraRef: RefObject<Camera>;
}

export function UserLocationButton({ cameraRef }: UserLocationButtonProps) {
  const { getUserLocation } = useMap();

  async function handleUserLocation() {
    const userLocation = await getUserLocation();
    if (!userLocation) return;

    cameraRef.current?.setCamera({
      centerCoordinate: [userLocation.longitude, userLocation.latitude],
      zoomLevel: 14,
      animationMode: "flyTo",
      animationDuration: 1000,
    });
  }

  return (
    <View
      style={{
        position: "absolute",
        left: sizes[3],
        bottom: sizes[3],
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.gray1,
        borderRadius: sizes.full,
        ...shadow,
      }}
    >
      <TouchableOpacity
        style={{ padding: sizes[2] }}
        activeOpacity={0.6}
        onPress={handleUserLocation}
      >
        <Icon name="Mark" color="secondary" size={sizes[6]} />
      </TouchableOpacity>
    </View>
  );
}
