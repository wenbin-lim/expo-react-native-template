import { useState } from "react";
import { Redirect, Stack } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "@src/components";
import { Image } from "expo-image";

import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginProps, login } from "@src/api/auth";

import theme from "@src/theme";
import { useAuth } from "@src/providers/auth";
const LoginScreen = () => {
  const { isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const form = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "00000002",
      password: "wenbin",
    },
  });

  const onLogin: SubmitHandler<LoginProps> = async ({ username, password }) => {
    try {
      setErrorMessage("");
      setLoggingIn(true);
      await login({ username, password });
      setLoggingIn(false);
    } catch (error) {
      console.log("Error onLogin", error);
      setErrorMessage("An error occurred. Please try again.");
      setLoggingIn(false);
    }
  };

  const onLoginError: SubmitErrorHandler<LoginProps> = (error) => {
    if (error) {
      const errorArr = Object.entries(error);

      let newErrorMessage = "";

      errorArr.forEach(([key, value]) => {
        newErrorMessage += `${value.message}\n`;
      });

      setErrorMessage(newErrorMessage);
    }
  };

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Image source={require("assets/icon.png")} style={styles.logoImage} />

      <Controller
        control={form.control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Membership ID"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Username"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />

      <TouchableOpacity
        style={styles.loginButton}
        disabled={loggingIn}
        onPress={() => {
          // reset error message
          setErrorMessage("");
          form.handleSubmit(onLogin, onLoginError)();
        }}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.padding.containerX,
    rowGap: 24,
  },
  logoImage: {
    width: 128,
    height: 128,
  },
  loginButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 999,
  },
  loginButtonText: {
    color: theme.colors.primaryText,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorMessage: {
    color: theme.colors.error,
    fontWeight: "bold",
    textAlign: "center",
  },
});
