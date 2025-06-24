import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { useApiInterceptor } from "@/hooks/use-interceptor";
import { colors } from "@/shared/theme/colors";
import { Tabs } from "expo-router";

export default function TabLayout() {
  useApiInterceptor();
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.gray3,
        header: () => <Header />,
        tabBarStyle: {
          backgroundColor: colors.gray1,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Icon name="BarChart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tires"
        options={{
          tabBarIcon: ({ color }) => <Icon name="LifeBuoy" color={color} />,
        }}
      />

      <Tabs.Screen
        name="maps"
        options={{
          tabBarIcon: ({ color }) => <Icon name="Map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          tabBarIcon: ({ color }) => <Icon name="PieChart" color={color} />,
        }}
      />
    </Tabs>
  );
}
