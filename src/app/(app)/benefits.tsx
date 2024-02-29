import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

import { useGetPrivileges } from "@src/api/privileges";

import { BenefitCard } from "@src/components/benefits";
import theme from "@src/theme";

const Benefits = () => {
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
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map((privilege) => (
        <BenefitCard key={privilege.id} privilege={privilege} />
      ))}
    </ScrollView>
  );
};

export default Benefits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.padding.containerY,
    paddingHorizontal: theme.padding.containerX,
    gap: 16,
  },
});
