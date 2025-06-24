import { Divider } from "@/components/divider";
import { shadow, sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { ReactNode } from "react";
import { Modal as ModalReact, TouchableOpacity, View } from "react-native";

interface SelectModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  children: ReactNode;
}
export function SelectModal({ show, setShow, children }: SelectModalProps) {
  return (
    <ModalReact
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(!show)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
        onPress={() => setShow(false)}
        activeOpacity={1}
      >
        <View
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: colors.gray1,
            borderTopRightRadius: sizes[8],
            borderTopLeftRadius: sizes[8],
            paddingTop: sizes[4],
            paddingHorizontal: sizes[2],
            ...shadow,
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: sizes[8],
              }}
            >
              <Divider
                width="4"
                color="gray4"
                style={{ borderRadius: sizes[8] }}
              />
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: sizes[4],
              paddingBottom: sizes[10],
              paddingTop: sizes[4],
            }}
          >
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </ModalReact>
  );
}
