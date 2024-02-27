import { StyleSheet, Text, View, Button } from "react-native";

import { useAuth } from "@src/providers/auth";

const SecretScreen = () => {
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text>hello world</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};
export default SecretScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
