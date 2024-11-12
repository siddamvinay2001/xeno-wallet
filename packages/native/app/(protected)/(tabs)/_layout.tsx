import { useUserStore } from "@/store/UserStore";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, View, Text } from "react-native";

export default function TabLayout() {
  const { loggedIn, setLoggedIn } = useUserStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Pressable
              onPress={() => {
                setLoggedIn(false);
              }}
            >
              <Text>Logout</Text>
            </Pressable>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
}
