import { Redirect, Tabs } from "expo-router";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import { useAuth } from "@src/providers/auth";

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
        initialRouteName="/privileges"
        screenOptions={{
          headerRight: () => <LogoutButton />,
        }}
        sceneContainerStyle={{
          backgroundColor: theme.colors.background,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: "/",
            title: "Privileges",
          }}
        />
        <Tabs.Screen
          name="membership-card"
          options={{
            href: "/membership-card",
            title: "Card",
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
