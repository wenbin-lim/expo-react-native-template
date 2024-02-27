import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

import { useAuth } from "@src/providers/auth";

import { Feather } from "@expo/vector-icons";

type Props = { title: string };

const StackHeader = ({ title }: Props) => {
  const { logout } = useAuth();

  return (
    <Stack.Screen
      options={{
        title,
        headerRight: () => (
          <TouchableOpacity onPress={logout}>
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    />
  );
};

export default StackHeader;
