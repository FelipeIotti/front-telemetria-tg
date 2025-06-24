import { useMap } from "@/hooks/use-map";
import { api } from "@/service/api";
import { MapStyles } from "@/shared/constants/map-styles";
import { GpsDTO } from "@/shared/dtos/gps-DTO";
import { MapStyleDTO } from "@/shared/dtos/map-style-DTO";
import { colors } from "@/shared/theme/colors";
import { formatTime } from "@/shared/utils/format-time";
import { haversineDistance } from "@/shared/utils/haversine-distance";
import {
  Camera,
  LineLayer,
  MapView,
  setAccessToken,
  ShapeSource,
} from "@rnmapbox/maps";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Loading } from "../loading";
import { CarPin } from "./car-pin";
import { FinishLinePin } from "./finish-line-pin";
import { MapStyleButton } from "./map-style-button";
import { MenuMapOptions } from "./menu-map-options";
import { RunDetailsCard } from "./run-details-card";
import { UserLocationButton } from "./user-location-button";
import { UserLocationPin } from "./user-location-pin";

const accessToken = process.env.EXPO_PUBLIC_MAP_BOX_API_KEY;
setAccessToken(accessToken);

// Função para calcular distância em km entre dois pontos (Haversine)

export function MapBox() {
  const cameraRef = useRef<Camera>(null);
  const { selectedLocation, setSelectedLocation } = useMap();
  const [mapStyle, setMapStyle] = useState<MapStyleDTO>("light");
  const [isLoading, setIsLoading] = useState(false);
  const [baseData, setBaseData] = useState<GpsDTO[]>([]);

  const [detailsData, setDetailsData] = useState({
    averageSpeed: 0,
    distance: 0,
    time: "00:00:00",
    turns: 0,
  });

  function calculateDetailsData(data: GpsDTO[]) {
    const totalDistance = data.reduce(
      (acc: number, point: GpsDTO, i: number) => {
        if (i === 0) return 0;
        const prev = data[i - 1];
        return (
          acc +
          haversineDistance(
            Number(prev.latitude),
            Number(prev.longitude),
            Number(point.latitude),
            Number(point.longitude)
          )
        );
      },
      0
    );

    const velocities = data.map((point: GpsDTO) => Number(point.velocity));
    const avgSpeed =
      velocities.reduce((a: number, b: number) => a + b, 0) / velocities.length;

    const startTime = new Date(data[0].created_at).getTime();
    const endTime = new Date(data[data.length - 1].created_at).getTime();
    const timeInSeconds = Math.floor((endTime - startTime) / 1000);

    const initialPoint = data[0];
    let lastLapTime = startTime;
    let laps = 0;

    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      const currentTime = new Date(current.created_at).getTime();

      const distance = haversineDistance(
        initialPoint.latitude,
        initialPoint.longitude,
        current.latitude,
        current.longitude
      );

      const timeSinceLastLap = (currentTime - lastLapTime) / 1000;

      if (distance <= 0.03 && timeSinceLastLap >= 60) {
        laps++;
        lastLapTime = currentTime;
      }
    }

    setDetailsData({
      averageSpeed: Number(avgSpeed.toFixed(1)),
      distance: Number(totalDistance.toFixed(2)),
      time: formatTime(timeInSeconds),
      turns: laps,
    });
  }

  async function handleLoadData() {
    // setIsLoading(true);
    try {
      const { data } = await api.get("/gps");

      if (data.length > 1) {
        calculateDetailsData(data);
      }

      setBaseData(data);

      data.length > 0 &&
        setSelectedLocation({
          latitude: Number(data[data.length - 1].latitude),
          longitude: Number(data[data.length - 1].longitude),
        });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoadData();

    // const interval = setInterval(() => {
    //   handleLoadData();
    // }, 1000);

    //return () => clearInterval(interval);
  }, []);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.gray6,
      }}
    >
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <>
          <UserLocationButton cameraRef={cameraRef} />
          <MenuMapOptions />
          <MapStyleButton mapStyle={mapStyle} setMapStyle={setMapStyle} />
          <RunDetailsCard data={detailsData} />

          {selectedLocation && (
            <MapView
              logoEnabled={false}
              scaleBarEnabled={false}
              attributionEnabled={false}
              projection="globe"
              styleURL={MapStyles[mapStyle]}
              style={{ width: "100%", height: "100%" }}
            >
              <Camera
                ref={cameraRef}
                centerCoordinate={[
                  selectedLocation.longitude,
                  selectedLocation.latitude,
                ]}
                zoomLevel={14}
                animationMode="flyTo"
                allowUpdates
              />
              <UserLocationPin />

              {baseData.length > 0 && <FinishLinePin data={baseData[0]} />}

              {baseData.length > 1 && (
                <CarPin data={baseData[baseData.length - 1]} />
              )}

              {baseData.length > 1 && (
                <ShapeSource
                  id="lineSource"
                  shape={{
                    type: "Feature",
                    geometry: {
                      type: "LineString",
                      coordinates: baseData.map((point) => [
                        Number(point.longitude),
                        Number(point.latitude),
                      ]),
                    },
                    properties: {},
                  }}
                >
                  <LineLayer
                    id="lineLayer"
                    style={{
                      lineColor: colors.secondary,
                      lineWidth: 4,
                      lineJoin: "round",
                      lineCap: "round",
                    }}
                  />
                </ShapeSource>
              )}
            </MapView>
          )}
        </>
      )}
    </View>
  );
}
