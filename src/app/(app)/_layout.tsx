import { Stack, Redirect } from "expo-router";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import { useAuth } from "@src/providers/auth";

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
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
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
