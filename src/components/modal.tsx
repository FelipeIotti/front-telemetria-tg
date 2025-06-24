import { ReactNode, useState } from "react";
import { Modal as ModalReact, TouchableOpacity, View } from "react-native";

import { shadow } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { Button } from "./button";
import { Icon } from "./icon";
import { Text } from "./text";

interface ModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  type?: "default" | "logout";
}

export function Modal({
  show,
  setShow,
  title,
  children,
  type = "default",
  onConfirm,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  async function handleConfirm() {
    try {
      setLoading(true);
      if (onConfirm) await onConfirm();
      setShow(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ModalReact
      animationType="none"
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(!show)}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            backgroundColor: colors.gray1,
            borderRadius: 16,
            padding: 24,
            gap: 24,
            ...shadow,
          }}
        >
          <View
            style={{
              gap: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text fontWeight="heading">{title}</Text>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setShow(false)}
              >
                <Icon name={"CloseFill"} color="gray3" size={12} />
              </TouchableOpacity>
            </View>
            {children}
          </View>
          {type === "default" ? (
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Button
                text="Sair"
                type="gray5"
                textButtonColor="gray1"
                onPress={() => {
                  setShow(false);
                }}
                borderRadius={8}
                style={{ flex: 1 }}
              >
                <Text fontWeight="heading">back</Text>
              </Button>
              {onConfirm && (
                <Button
                  text="Confirmar"
                  type="secondary"
                  textButtonColor="gray1"
                  onPress={() => {
                    onConfirm();
                    setShow(false);
                  }}
                  borderRadius={8}
                  style={{ flex: 1 }}
                />
              )}
            </View>
          ) : (
            onConfirm && (
              <View>
                <Button
                  text="confirm"
                  type="red"
                  isLoading={loading}
                  borderRadius={8}
                  onPress={() => {
                    handleConfirm();
                  }}
                />
              </View>
            )
          )}
        </View>
      </View>
    </ModalReact>
  );
}
