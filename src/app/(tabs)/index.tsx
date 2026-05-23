import { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Plus, ShieldCheck, CalendarDays, ReceiptText } from "lucide-react-native";
import AddPurchaseModal from "../../components/AddPurchaseModal";
import { useBudgetStore } from "../../store/budgetstore";

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export default function DashboardScreen() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const currentBalance = useBudgetStore((state) => state.currentBalance);
  const reserve = useBudgetStore((state) => state.reserve);
  const billsBeforePayday = useBudgetStore((state) => state.billsBeforePayday);
  const purchases = useBudgetStore((state) => state.purchases);
  const safeToSpend = useBudgetStore((state) => state.safeToSpend());

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appName}>Budget Flow</Text>
          <Text style={styles.subtitle}>Know what is safe to spend.</Text>
        </View>

        <View style={styles.safeCard}>
          <View style={styles.cardTopRow}>
            <Text style={styles.label}>Safe to Spend</Text>

            <View style={styles.statusPill}>
              <ShieldCheck size={15} color="#2563EB" />
              <Text style={styles.statusText}>On Track</Text>
            </View>
          </View>

          <Text style={styles.amount}>{money(safeToSpend)}</Text>

          <Text style={styles.helper}>
            After purchases, bills, and reserve before your next paycheck.
          </Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Current Balance</Text>
            <Text style={styles.rowValue}>{money(currentBalance)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Bills Before Payday</Text>
            <Text style={styles.rowValue}>-{money(billsBeforePayday)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Essential Reserve</Text>
            <Text style={styles.rowValue}>-{money(reserve)}</Text>
          </View>
        </View>

        <View style={styles.nextPaycheckCard}>
          <View style={styles.iconCircle}>
            <CalendarDays size={22} color="#2563EB" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.sectionLabel}>Next Paycheck</Text>
            <Text style={styles.sectionValue}>Friday, May 30</Text>
          </View>

          <Text style={styles.payAmount}>$3,200</Text>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Purchases</Text>
            <ReceiptText size={20} color="#64748B" />
          </View>

          {purchases.length === 0 ? (
            <Text style={styles.emptyText}>
              No purchases yet. Add one to see safe-to-spend update.
            </Text>
          ) : (
            purchases
              .slice(0, 5)
              .map((purchase) => (
                <PurchaseRow
                  key={purchase.id}
                  name={purchase.name}
                  status={purchase.status}
                  amount={money(purchase.amount)}
                />
              ))
          )}
        </View>
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => setShowPurchaseModal(true)}>
        <Plus size={28} color="#FFFFFF" />
      </Pressable>

      <AddPurchaseModal
        visible={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </SafeAreaView>
  );
}

function PurchaseRow({
  name,
  status,
  amount,
}: {
  name: string;
  status: string;
  amount: string;
}) {
  return (
    <View style={styles.listRow}>
      <View>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={status === "Pending" ? styles.pendingMeta : styles.itemMeta}>
          {status}
        </Text>
      </View>

      <Text style={styles.itemAmount}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    padding: 20,
    paddingBottom: 110,
  },
  header: {
    marginTop: 18,
    marginBottom: 22,
  },
  appName: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 6,
  },
  safeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 5,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "700",
  },
  amount: {
    fontSize: 52,
    fontWeight: "900",
    color: "#2563EB",
    marginTop: 14,
    letterSpacing: -1.5,
  },
  helper: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 8,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rowLabel: {
    color: "#64748B",
    fontSize: 15,
  },
  rowValue: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
  },
  nextPaycheckCard: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLabel: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionValue: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 2,
  },
  payAmount: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "900",
  },
  sectionCard: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "900",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  listRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },
  itemMeta: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
  },
  pendingMeta: {
    color: "#F59E0B",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "700",
  },
  itemAmount: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 96,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 8,
  },
});