module.exports = {
  expo: {
    name: "Telemetria",
    slug: "tg-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "telemetry",
    extra: {
      eas: {
        projectId: "8d91197c-3d04-435e-80e8-d5f6ec63fae7",
      },
    },
    updates: {
      url: "https://u.expo.dev/8d91197c-3d04-435e-80e8-d5f6ec63fae7",
    },
    runtimeVersion: "1.0.1",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#27272a",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.codescript.tg-app",
      infoPlist: {
        UIBackGroundNodes: ["location"],
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
        "android.permission.BACKGROUND_LOCATION",
      ],
      package: "com.codescript.tgapp",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsImpl: "mapbox",
          RNMapboxMapsDownloadToken: process.env.MAP_BOX_API_KEY,
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
      "expo-font",
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
