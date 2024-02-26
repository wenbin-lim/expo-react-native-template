import { useState } from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginProps } from "@src/api/auth";

import theme from "@src/theme";

// Login page as entry
const App = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "test",
      verificationCode: "",
    },
  });

  const onLogin: SubmitHandler<LoginProps> = ({ email, verificationCode }) => {
    console.log("email", email);
    console.log("verificationCode", verificationCode);
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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Text>Login here</Text>

      <Controller
        control={form.control}
        name="email"
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
        name="verificationCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.textInput}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button
        title="Login"
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
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: theme.colors.error,
    fontWeight: "bold",
    textAlign: "center",
  },
});
