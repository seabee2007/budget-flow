import { create } from "zustand";

type PurchaseStatus = "Charged" | "Pending";

type Purchase = {
  id: string;
  name: string;
  amount: number;
  status: PurchaseStatus;
  date: string;
};

type BudgetState = {
  currentBalance: number;
  reserve: number;
  billsBeforePayday: number;
  purchases: Purchase[];

  addPurchase: (
    purchase: Omit<Purchase, "id" | "date">
  ) => void;

  safeToSpend: () => number;
};

export const useBudgetStore = create<BudgetState>((set, get) => ({
  currentBalance: 4229.32,

  reserve: 800,

  billsBeforePayday: 1245,

  purchases: [],

  addPurchase: (purchase) =>
    set((state) => ({
      purchases: [
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          ...purchase,
        },
        ...state.purchases,
      ],
    })),

  safeToSpend: () => {
    const state = get();

    const purchaseTotal = state.purchases.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    return (
      state.currentBalance -
      state.billsBeforePayday -
      state.reserve -
      purchaseTotal
    );
  },
}));