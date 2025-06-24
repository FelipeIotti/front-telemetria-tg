import CarSide from "@/assets/images/car-side.png";
import { CardData } from "@/components/card-data";
import { Loading } from "@/components/loading";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { api } from "@/service/api";
import { BaseDataDTO } from "@/shared/dtos/base-data-DTO";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [baseData, setBaseData] = useState<BaseDataDTO>({} as BaseDataDTO);

  async function handleLoadData() {
    setIsLoading(true);
    try {
      const { data } = await api.get("/base-data/last");
      setBaseData(data);
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
      <View style={{ flex: 2, width: "100%", padding: 8 }}>
        <Image
          source={CarSide}
          alt="Carro de Lado"
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>

      <View
        style={{
          flex: 3,
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Loading size="large" />
        ) : (
          <>
            <View
              style={{
                flex: 1,
                gap: 16,
                width: "100%",
                flexDirection: "row",
              }}
            >
              <CardData value={baseData?.velocity} type="Km/h" />
              <CardData value={baseData?.rpm} type="Rpm" />
            </View>

            <View
              style={{
                flex: 1,
                gap: 16,
                width: "100%",
                flexDirection: "row",
              }}
            >
              <CardData value={baseData?.fuel} type="/4" />
              <CardData value={baseData?.temperature} type="ºC" />
            </View>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}
