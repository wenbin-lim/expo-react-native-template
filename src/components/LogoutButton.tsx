import { TouchableOpacity, StyleSheet } from "react-native";

import { useAuth } from "@src/providers/auth";

import { Feather } from "@expo/vector-icons";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <TouchableOpacity style={styles.container} onPress={logout}>
      <Feather name="log-out" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});
