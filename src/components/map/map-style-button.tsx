import { MapStyleDTO } from "@/shared/dtos/map-style-DTO";
import { shadow, sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "../icon";

interface MapStyleButtonProps {
  setMapStyle: (value: MapStyleDTO) => void;
  mapStyle: MapStyleDTO;
}

export function MapStyleButton({ mapStyle, setMapStyle }: MapStyleButtonProps) {
  return (
    <View
      style={{
        position: "absolute",
        right: sizes[2],
        top: sizes[2],
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
        onPress={() =>
          setMapStyle(mapStyle === "satellite" ? "light" : "satellite")
        }
      >
        <Icon
          name={mapStyle === "satellite" ? "MapOutline" : "Globe"}
          color="secondary"
          size={sizes[6]}
        />
      </TouchableOpacity>
    </View>
  );
}
