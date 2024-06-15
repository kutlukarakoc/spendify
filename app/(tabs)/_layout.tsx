import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { TabBarIcon } from "~/components/navigation/TabBarIcon";
import { Colors } from "~/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={{ paddingTop: 40 }}
      screenOptions={{
        tabBarActiveTintColor: Colors["blue-500"],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
          title: "Charts",
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
            <View
            className="bg-background absolute -top-6 border rounded-full border-primary w-12 h-12 items-center justify-center bg-main text-center"
              style={{
                shadowColor: Colors["blue-500"],
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
              }}
            >
              <Text className="text-primary text-3xl native:text-3xl">+</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
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
          title: "Settings",
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
