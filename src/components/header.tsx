import Logo from "@/assets/images/logo.png";
import { colors } from "@/shared/theme/colors";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-gray1"
      style={{
        paddingTop: insets.top,
        height: 2 * insets.top,
        backgroundColor: colors.gray1,
      }}
    >
      <View className="w-full justify-center">
        <Image
          source={Logo}
          style={{
            width: "auto",
            height: "100%",
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
