import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";
import theme from "@src/theme";

type Props = TextInputProps & {
  label?: string;
};

const TextInput = ({ label, onChangeText, value, secureTextEntry }: Props) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, focused && styles.labelFocused]}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[styles.input, focused && styles.inputFocused]}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    rowGap: 8,
  },
  label: {},
  input: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  labelFocused: {
    color: theme.colors.primary,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
});
