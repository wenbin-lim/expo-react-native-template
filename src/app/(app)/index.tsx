import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAuth } from "@src/providers/auth";
import { format } from "date-fns";
import { Image } from "expo-image";
import theme from "@src/theme";

const MembershipCard = () => {
  const { user } = useAuth();

  const formatDateToString = (date: string) => {
    if (!date) return "-";

    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={require("assets/icon.png")} style={styles.logoImage} />

        <View style={styles.row}>
          <Text style={styles.rowKey}>Name</Text>
          <Text style={styles.rowValue}>
            {user?.first_name || ""} {user?.last_name || ""}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowKey}>Membership No.</Text>
          <Text style={styles.rowValue}>{user?.username || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowKey}>Joined Date</Text>
          <Text style={styles.rowValue}>
            {formatDateToString(user?.joined)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowKey}>Expiry Date</Text>
          <Text style={styles.rowValue}>
            {formatDateToString(user?.expire)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowKey}>Membership Points</Text>
          <Text style={styles.rowValue}>{JSON.stringify(user?.points)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default MembershipCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    paddingVertical: 50,
    rowGap: 12,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    borderRadius: 16,
  },
  logoImage: {
    width: 180,
    height: 180,
  },
  row: {
    width: "100%",
  },
  rowKey: {
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
  },
  rowValue: {
    textAlign: "center",
  },
});
