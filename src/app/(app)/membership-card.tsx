import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "@src/providers/auth";
import { format } from "date-fns";

import theme from "@src/theme";

const MembershipCard = () => {
  const { user } = useAuth();

  const formatDateToString = (date: string) => {
    if (!date) return "-";

    return format(new Date(date), "dd-MM-yyyy");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.rowKey}>Membership No.</Text>
        <Text style={styles.rowValue}>{user?.username || "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowKey}>First Name</Text>
        <Text style={styles.rowValue}>{user?.first_name || "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowKey}>Last Name</Text>
        <Text style={styles.rowValue}>{user?.last_name || "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowKey}>Joined Date</Text>
        <Text style={styles.rowValue}>{formatDateToString(user?.joined)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowKey}>Membership Expiry Date</Text>
        <Text style={styles.rowValue}>{formatDateToString(user?.expire)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowKey}>Membership Points</Text>
        <Text style={styles.rowValue}>{JSON.stringify(user?.points)}</Text>
      </View>
    </View>
  );
};
export default MembershipCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.padding.containerY,
    paddingHorizontal: theme.padding.containerX,
    rowGap: 8,
  },
  row: {
    columnGap: 16,
  },
  rowKey: {
    fontWeight: "bold",
  },
  rowValue: {},
});