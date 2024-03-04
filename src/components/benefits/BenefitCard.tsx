import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { format } from "date-fns";

import { Privilege } from "@src/api/privileges";

import { AntDesign } from "@expo/vector-icons";
import theme from "@src/theme";

type Props = {
  privilege?: Privilege;
};

const BenefitCard = ({ privilege }: Props) => {
  if (!privilege) return null;

  const [openModal, setOpenModal] = useState(false);

  const formatDateToString = (date: string) => {
    if (!date) return "-";

    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <>
      <TouchableOpacity
        key={privilege.id}
        style={styles.card}
        onPress={() => {
          setOpenModal(true);
        }}
      >
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
          <Text style={styles.cardContentDates}>
            {formatDateToString(privilege.start_date)} to{" "}
            {formatDateToString(privilege.end_date)}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal visible={openModal} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalWrapper}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setOpenModal(false)}
            >
              <AntDesign name="closecircleo" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.modalCard}>
              <Text style={styles.modalCardHeader}>Terms & Conditions</Text>

              <ScrollView contentContainerStyle={styles.modalCardContent}>
                <Text>{privilege.long_description}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalClose: {
    width: 36,
    height: 36,
    marginRight: -12,
    alignSelf: "flex-end",
  },
  modalWrapper: {
    width: 400,
    maxWidth: "80%",
  },
  modalCard: {
    backgroundColor: theme.colors.surface,
    minHeight: 300,
    maxHeight: "80%",
    borderRadius: 16,
    overflow: "hidden",
  },
  modalCardHeader: {
    backgroundColor: theme.colors.background,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 14,
  },
  modalCardContent: {
    backgroundColor: theme.colors.surface,
    padding: 16,
  },
});
