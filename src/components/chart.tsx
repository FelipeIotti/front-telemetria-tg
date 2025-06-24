import { BaseDataDTO } from "@/shared/dtos/base-data-DTO";
import { colors } from "@/shared/theme/colors";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useFont } from "@shopify/react-native-skia";
import { View } from "react-native";
import { CartesianChart, Line } from "victory-native"; // certifique-se de estar usando os componentes corretos

interface ChartProps {
  xKey: string;
  yKeys: string[];
  data: BaseDataDTO[] | TiresDataDTO[];
}

export function Chart({ xKey, yKeys, data }: ChartProps) {
  const font = useFont(Roboto_400Regular, 12);

  const colorsLines = [
    colors.secondary,
    colors.red,
    colors.green,
    colors.white,
  ];

  return (
    data.length > 0 && (
      <View style={{ height: "85%" }}>
        <CartesianChart
          //@ts-ignore
          data={data}
          xKey={xKey as never}
          yKeys={yKeys as never[]}
          axisOptions={{
            font,
            labelColor: colors.white,
            lineColor: colors.gray3,
          }}
        >
          {({ points }) => (
            <>
              {yKeys.map((key, index) => (
                <Line
                  key={index}
                  //@ts-ignore
                  points={points[key]}
                  color={colorsLines[index]}
                  strokeWidth={2}
                />
              ))}
            </>
          )}
        </CartesianChart>
      </View>
    )
  );
}
