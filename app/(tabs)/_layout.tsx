import { Tabs } from "expo-router";
import { TabBarIcon } from "~/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={{ paddingTop: 40, paddingBottom: 20 }}
      screenOptions={{
        tabBarActiveTintColor: "#0077EE",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="charts/index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "stats-chart" : "stats-chart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addExpense/index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={34}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
