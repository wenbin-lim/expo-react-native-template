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
    gap: 16,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    height: 64,
    width: 64,
    objectFit: "cover",
    borderRadius: 8,
  },
  cardContent: {
    paddingHorizontal: 8,
    gap: 4,
  },
  cardContentTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  cardContentText: {
    fontSize: 10,
  },
  cardContentDates: {
    fontSize: 10,
    opacity: 0.8,
  },
});
