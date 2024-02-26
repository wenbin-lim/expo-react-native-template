import { Stack } from "expo-router";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import theme from "@src/theme";

// Login page as entry
const App = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Text>Login here</Text>

      <TextInput style={styles.textInput} />

      <TextInput style={styles.textInput} />

      <Button title="Login" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.padding.containerX,
    rowGap: 16,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderWidth: 1,
  },
});
