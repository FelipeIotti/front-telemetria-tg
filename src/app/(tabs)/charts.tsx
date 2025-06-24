import { Calendar } from "@/components/calendar";
import { Chart } from "@/components/chart";
import { InputSelect } from "@/components/forms/input-select";
import { Icon } from "@/components/icon";
import { Loading } from "@/components/loading";
import { Modal } from "@/components/modal";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { Text } from "@/components/text";
import { api } from "@/service/api";
import { chartConfig } from "@/shared/constants/chart-config";
import { chartOptions } from "@/shared/constants/options/chart-options";
import { BaseDataDTO } from "@/shared/dtos/base-data-DTO";
import { OptionsDTO } from "@/shared/dtos/options-DTO";
import { sizes } from "@/shared/theme";
import { colors } from "@/shared/theme/colors";
import { normalizeTimestamp } from "@/shared/utils/normalize-timestamp";
import moment from "moment";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<BaseDataDTO[] | TiresDataDTO[]>(
    []
  );
  const [chart, setChart] = useState<OptionsDTO>({} as OptionsDTO);
  const [yKeys, setYKeys] = useState<string[]>(["velocity"]);
  const [xKey, setXKey] = useState("created_at");

  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const loadChartData = async () => {
    if (!chart?.value) return;

    const config = chartConfig[chart.value as keyof typeof chartConfig];
    if (!config) return;

    setIsLoading(true);
    try {
      const { data } = await api.get(config.endpoint);
      const normalized = normalizeTimestamp(data, config.yKeys, date);
      //@ts-ignore
      setChartData(normalized);
      setXKey(config.xKey);
      setYKeys(config.yKeys);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChartSelection = (value: OptionsDTO) => {
    setChart(value);
  };

  useEffect(() => {
    loadChartData();
  }, [chart, date]);

  return (
    <ScreenWrapper>
      <View style={{ display: "flex", gap: sizes[4] }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputSelect
            label="Selecione um gráfico"
            placeholder="Escolha o gráfico"
            value={chart}
            onChange={handleChartSelection}
            options={chartOptions}
          />
          <View style={{ marginTop: sizes[6] }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 30,
                gap: sizes[2],
                backgroundColor: colors.secondary,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
              onPress={() => setShowModal(true)}
            >
              <Text fontColor="gray1" fontWeight="heading" fontSize="md">
                {moment(date).format("DD/MM/YY")}
              </Text>
              <Icon name="Calendar" size={18} color="gray1" />
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View style={{ marginTop: sizes[10], height: "100%" }}>
            <Loading size="large" />
          </View>
        ) : (
          <Chart
            key={yKeys.join("-")}
            xKey={xKey}
            yKeys={yKeys}
            data={chartData}
          />
        )}
      </View>

      <Modal
        show={showModal}
        setShow={setShowModal}
        title="Selecione um dia"
        onConfirm={() => setShowModal(false)}
      >
        <Calendar setDate={setDate} date={date} />
      </Modal>
    </ScreenWrapper>
  );
}
