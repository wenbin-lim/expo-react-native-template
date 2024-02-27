import { StyleSheet, Text, View } from "react-native";

import theme from "@src/theme";

type Props = {};

const Privileges = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Privileges</Text>
    </View>
  );
};

export default Privileges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.padding.containerY,
    paddingHorizontal: theme.padding.containerX,
    rowGap: 8,
  },
});
