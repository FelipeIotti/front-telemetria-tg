import CarTop from "@/assets/images/car-top.png";
import { CardTiresData } from "@/components/card-tires-data";
import { Loading } from "@/components/loading";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { api } from "@/service/api";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [changeValue, setChangeValue] = useState(false);
  const [tiresData, setTiresData] = useState<TiresDataDTO>();

  function handleChangeValue() {
    setChangeValue((prev) => !prev);
  }

  async function handleLoadData() {
    setIsLoading(true);
    try {
      const { data } = await api.get("/tires/last");
      setTiresData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <ScreenWrapper>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading size="large" />
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: 8,
            }}
          >
            <CardTiresData
              pressValue={tiresData?.press_tire_fl}
              tiresValue={tiresData?.temp_tire_fl}
              titleDirection="Left"
              change={changeValue}
            />
            <CardTiresData
              pressValue={tiresData?.press_tire_fr}
              tiresValue={tiresData?.temp_tire_fr}
              titleDirection="Right"
              change={changeValue}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleChangeValue}
            style={{
              padding: 8,
              alignItems: "center",
            }}
          >
            <Image
              source={CarTop}
              alt="Carro de cima"
              style={{
                width: 250,
                height: 250,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: 8,
            }}
          >
            <CardTiresData
              pressValue={tiresData?.press_tire_bl}
              tiresValue={tiresData?.temp_tire_bl}
              titleDirection="Left"
              change={changeValue}
            />
            <CardTiresData
              pressValue={tiresData?.press_tire_br}
              tiresValue={tiresData?.temp_tire_br}
              titleDirection="Right"
              change={changeValue}
            />
          </View>
        </>
      )}
    </ScreenWrapper>
  );
}
