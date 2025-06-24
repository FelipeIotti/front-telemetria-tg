import { Loading } from "@/components/loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import "react-native-gesture-handler";
import "react-native-reanimated";

import { MapContextProvider } from "@/contexts/map-context";
import { ToastProvider } from "@/contexts/toast-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <>
      {fontsLoaded ? (
        <>
          <StatusBar style={"light"} />
          <ToastProvider>
            <MapContextProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="(tabs)" />
              </Stack>
            </MapContextProvider>
          </ToastProvider>
        </>
      ) : (
        <Loading size="large" />
      )}
    </>
  );
}
