import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { format } from "date-fns";

import { Privilege } from "@src/api/privileges";

import theme from "@src/theme";

type Props = {
  privilege?: Privilege;
};

const BenefitCard = ({ privilege }: Props) => {
  if (!privilege) return null;

  const formatDateToString = (date: string) => {
    if (!date) return "-";

    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
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
        <Text style={styles.cardContentText}>{privilege.points} Points</Text>
        <Text style={styles.cardContentDates}>
          {formatDateToString(privilege.start_date)} to{" "}
          {formatDateToString(privilege.end_date)}
        </Text>
      </View>
    </View>
  );
};

export default BenefitCard;

const styles = StyleSheet.create({
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
