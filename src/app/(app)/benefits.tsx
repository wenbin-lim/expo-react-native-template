import { StyleSheet, Text, ScrollView, RefreshControl } from "react-native";

import { useGetPrivileges } from "@src/api/privileges";

import { BenefitCard } from "@src/components/benefits";
import theme from "@src/theme";

const Benefits = () => {
  const { data, error, isLoading, refetch } = useGetPrivileges();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {error ? (
        <Text>An error occured. Please try again later!</Text>
      ) : (
        data?.map((privilege) => (
          <BenefitCard key={privilege.id} privilege={privilege} />
        ))
      )}
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
