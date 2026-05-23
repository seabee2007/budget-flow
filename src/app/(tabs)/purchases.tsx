import { SafeAreaView, Text, View, Pressable, StyleSheet } from "react-native";

export default function PurchasesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Purchases</Text>
      <Text style={styles.subtitle}>Track charged and pending purchases.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8FAFC" },
  title: { fontSize: 30, fontWeight: "800", color: "#0F172A", marginTop: 20 },
  subtitle: { fontSize: 16, color: "#64748B", marginTop: 6 },
});