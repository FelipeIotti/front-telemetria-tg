export const chartConfig = {
  VelXTemp: {
    xKey: "created_at",
    yKeys: ["velocity"],
    endpoint: "/base-data",
  },
  TempCVTXTemp: {
    xKey: "created_at",
    yKeys: ["temperature"],
    endpoint: "/base-data",
  },
  PressTPMSXTemp: {
    xKey: "created_at",
    yKeys: ["press_tire_fr", "press_tire_fl", "press_tire_br", "press_tire_bl"],
    endpoint: "/tires",
  },
  TempTPMXTemp: {
    xKey: "created_at",
    yKeys: ["temp_tire_fr", "temp_tire_fl", "temp_tire_br", "temp_tire_bl"],
    endpoint: "/tires",
  },
  FuelXTemp: {
    xKey: "created_at",
    yKeys: ["fuel"],
    endpoint: "/base-data",
  },
};
