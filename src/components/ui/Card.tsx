import { View, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export default function Card({ children }: any) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,

    elevation: 4,
  },
});