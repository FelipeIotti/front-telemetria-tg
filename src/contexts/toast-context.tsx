import { Text } from "@/components/text";
import { colors } from "@/shared/theme/colors";

import React, { createContext, ReactNode, useCallback, useState } from "react";
import { Animated, useAnimatedValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ToastProps {
  type?: "error" | "success";
  title: string;
  duration?: number;
}

interface ToastContextProviderProps {
  children: ReactNode;
}

interface ToastContextProps {
  showToast: (props: ToastProps) => void;
}

export const ToastContext = createContext<ToastContextProps>(
  {} as ToastContextProps
);

export function ToastProvider({ children }: ToastContextProviderProps) {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [visible, setVisible] = useState(false);

  const opacity = useAnimatedValue(0);
  const insets = useSafeAreaInsets();

  const showToast = useCallback(
    ({ title, type = "success", duration = 3000 }: ToastProps) => {
      setToast({ title, type });
      setVisible(true);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => handleClose(), duration);
    },
    []
  );

  function handleClose() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setToast(null);
    });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && toast && (
        <Animated.View
          style={[
            {
              position: "absolute",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 2 },
              elevation: 5,
              zIndex: 1000,
              top: insets.top,
              alignSelf: "center",
              maxWidth: "80%",
            },
            {
              backgroundColor:
                toast.type === "success" ? colors.green : colors.red,
            },
            { opacity },
          ]}
        >
          <Text fontWeight="heading" fontColor="white">
            {toast.title}
          </Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}
