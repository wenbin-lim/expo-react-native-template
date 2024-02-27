import { TouchableOpacity } from "react-native";

import { useAuth } from "@src/providers/auth";

import { Feather } from "@expo/vector-icons";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <TouchableOpacity onPress={logout}>
      <Feather name="log-out" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default LogoutButton;
