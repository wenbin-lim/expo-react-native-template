import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

// fonts
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import theme from "@src/theme";

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        // base screen options
        screenOptions={{
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
    </SafeAreaProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
