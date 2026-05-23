import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Reserve, backup, privacy, and future sync.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8FAFC" },
  title: { fontSize: 30, fontWeight: "800", color: "#0F172A", marginTop: 20 },
  subtitle: { fontSize: 16, color: "#64748B", marginTop: 6 },
});