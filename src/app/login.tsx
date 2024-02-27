import { useState } from "react";
import { Redirect, Stack } from "expo-router";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

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
      setLoggingIn(true);
      await login({ username, password });
      setLoggingIn(false);
    } catch (error) {
      console.log("Error onLogin", error);
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

      <Text>Login Page</Text>

      <Controller
        control={form.control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.textInput}
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
            style={styles.textInput}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />

      <Button
        title="Login"
        disabled={loggingIn}
        onPress={() => {
          // reset error message
          setErrorMessage("");
          form.handleSubmit(onLogin, onLoginError)();
        }}
      />

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
    rowGap: 16,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: theme.colors.error,
    fontWeight: "bold",
    textAlign: "center",
  },
});
