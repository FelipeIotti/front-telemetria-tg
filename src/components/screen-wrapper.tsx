import { sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import { Loading } from "./loading";

interface ScreenWrapperProps extends ViewProps {
  loading?: boolean;
  scrollView?: boolean;
}

export function ScreenWrapper({
  children,
  loading,
  scrollView = false,

  ...props
}: ScreenWrapperProps) {
  return loading ? (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Loading size="large" />
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {scrollView ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: colors.gray6,
              padding: sizes[4],
            }}
            {...props}
          >
            {children}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: colors.gray6,
            padding: sizes[4],
          }}
          {...props}
        >
          {children}
        </View>
      )}
    </TouchableWithoutFeedback>
  );
}
