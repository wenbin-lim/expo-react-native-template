import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useGetPrivileges } from "@src/api/privileges";

import theme from "@src/theme";

const Privileges = () => {
  const { data, error, isLoading } = useGetPrivileges();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>An error occured. Please try again later!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data?.map((privilege) => (
        <View key={privilege.id} style={styles.card}>
          <Text>{privilege.name}</Text>
        </View>
      ))}
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
  card: {},
});
