import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { X } from "lucide-react-native";
import { useBudgetStore } from "../store/budgetstore";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AddPurchaseModal({ visible, onClose }: Props) {
  const addPurchase = useBudgetStore((state) => state.addPurchase);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"Charged" | "Pending">("Charged");

  function handleSave() {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) return;

    addPurchase({
      name: name.trim() || "Purchase",
      amount: parsedAmount,
      status,
    });

    setName("");
    setAmount("");
    setStatus("Charged");
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Purchase</Text>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={22} color="#0F172A" />
            </Pressable>
          </View>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Groceries, gas, lunch..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            <Pressable
              onPress={() => setStatus("Charged")}
              style={[
                styles.statusButton,
                status === "Charged" && styles.statusButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  status === "Charged" && styles.statusTextActive,
                ]}
              >
                Charged
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setStatus("Pending")}
              style={[
                styles.statusButton,
                status === "Pending" && styles.statusButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  status === "Pending" && styles.statusTextActive,
                ]}
              >
                Pending
              </Text>
            </Pressable>
          </View>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Purchase</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 22,
    paddingBottom: 34,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 16,
    fontSize: 17,
    color: "#0F172A",
  },
  statusRow: {
    flexDirection: "row",
    gap: 10,
  },
  statusButton: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  statusButtonActive: {
    backgroundColor: "#DBEAFE",
    borderColor: "#2563EB",
  },
  statusText: {
    color: "#64748B",
    fontWeight: "800",
  },
  statusTextActive: {
    color: "#2563EB",
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});