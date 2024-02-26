import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "App Entry",
        }}
      />

      <Text>Hello world</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
