import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { format } from "date-fns";

import { useGetPrivileges } from "@src/api/privileges";
import { Image } from "expo-image";
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

  const formatDateToString = (date: string) => {
    if (!date) return "-";

    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.map((privilege) => (
        <View key={privilege.id} style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{
              uri: privilege.image,
            }}
            contentFit="cover"
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardContentTitle}>{privilege.name}</Text>
            <Text style={styles.cardContentText}>
              {privilege.short_description}
            </Text>
            <Text style={styles.cardContentText}>
              {privilege.points} Points
            </Text>
            <Text style={styles.cardContentDates}>
              {formatDateToString(privilege.start_date)} to{" "}
              {formatDateToString(privilege.end_date)}
            </Text>
          </View>
        </View>
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    flex: 1,
    flexBasis: "40%",
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 100,
  },
  cardContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 4,
  },
  cardContentTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardContentText: {
    fontSize: 12,
    opacity: 0.8,
  },
  cardContentDates: {
    fontSize: 10,
    opacity: 0.6,
  },
});
