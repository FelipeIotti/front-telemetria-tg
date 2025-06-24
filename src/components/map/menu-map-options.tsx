import { shadow, sizes } from "@/shared/theme";

import { api } from "@/service/api";
import { colors } from "@/shared/theme/colors";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "../icon";
import { Text } from "../text";

interface MenuMapOptionsProps {}

export function MenuMapOptions({}: MenuMapOptionsProps) {
  const [showOptions, setOptions] = useState(false);

  async function handleCleanData() {
    await api.delete("/gps");
  }

  return (
    <View
      style={{
        position: "absolute",
        right: sizes[3],
        bottom: sizes[3],
        zIndex: 10,
        alignItems: "flex-end",
        ...shadow,
      }}
    >
      {showOptions && (
        <View
          style={{
            padding: sizes[2],
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.gray1,
            borderRadius: sizes[2],
            marginBottom: sizes[1],
            gap: sizes[2],
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: sizes[2],
              alignItems: "center",
            }}
            onPress={async () => await handleCleanData()}
          >
            <Text>Limpar dados</Text>
            <Icon name="Trash" color="red" strokeWidth={0} />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={{
          padding: sizes[2],
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.gray1,
          borderRadius: sizes.full,
        }}
        activeOpacity={0.6}
        onPress={() => setOptions(!showOptions)}
      >
        <Icon name="Menu" color="secondary" size={sizes[6]} />
      </TouchableOpacity>
    </View>
  );
}
