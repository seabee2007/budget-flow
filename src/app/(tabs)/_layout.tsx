import { Tabs } from "expo-router";
import { Home, Receipt, CalendarDays, WalletCards, Settings } from "lucide-react-native";
import { SafeAreaView, Text, View, Pressable, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="purchases"
        options={{
          title: "Purchases",
          tabBarIcon: ({ color, size }) => <Receipt color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="bills"
        options={{
          title: "Bills",
          tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="paychecks"
        options={{
          title: "Paychecks",
          tabBarIcon: ({ color, size }) => <WalletCards color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}