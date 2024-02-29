import { Redirect, Tabs } from "expo-router";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import { useAuth } from "@src/providers/auth";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LogoutButton } from "@src/components";
import theme from "@src/theme";

const AppLayout = () => {
  const { isAuthenticating, isAuthenticated } = useAuth();

  if (isAuthenticating) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  } else {
    return (
      <Tabs
        initialRouteName="/membership-card"
        screenOptions={{
          headerRight: () => <LogoutButton />,
          tabBarActiveTintColor: theme.colors.primary,
        }}
        sceneContainerStyle={
          {
            // backgroundColor: theme.colors.background,
          }
        }
      >
        <Tabs.Screen
          name="index"
          options={{
            href: "/",
            title: "Home",
            headerTitle: "Member Card",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="benefits"
          options={{
            href: "/benefits",
            title: "Benefits",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    );
  }
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.padding.containerX,
  },
});
