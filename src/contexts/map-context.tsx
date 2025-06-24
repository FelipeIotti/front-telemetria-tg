import { CoordinatesDTO } from "@/shared/dtos/coordinates-DTO";
import * as Location from "expo-location";
import { createContext, ReactNode, useEffect, useState } from "react";

export type MapContextDataProps = {
  selectedLocation: CoordinatesDTO | null;
  setSelectedLocation: (value: CoordinatesDTO | null) => void;
  getUserLocation: () => Promise<CoordinatesDTO | undefined>;
};

type MapContextProviderProps = {
  children: ReactNode;
};

export const MapContext = createContext<MapContextDataProps>(
  {} as MapContextDataProps
);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [selectedLocation, setSelectedLocation] =
    useState<CoordinatesDTO | null>(null);

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return false;
    }
    return true;
  }

  async function getUserLocation() {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    const userLocation = await Location.getCurrentPositionAsync({});

    const newLocation = {
      longitude: userLocation.coords.longitude,
      latitude: userLocation.coords.latitude,
    };

    setSelectedLocation(newLocation);

    return newLocation;
  }

  useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <MapContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        getUserLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
