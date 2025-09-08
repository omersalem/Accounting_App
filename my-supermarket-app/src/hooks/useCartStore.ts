import { create } from 'zustand';

export type CartItem = {
  readonly productId: string;
  readonly name: string;
  readonly price: number; // unit price
  readonly qty: number;
  readonly unit: string; // e.g., "kg", "pcs"
};

type CartState = {
  items: readonly CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item, qty = 1) => {
    const items = [...get().items];
    const idx = items.findIndex(i => i.productId === item.productId);
    if (idx >= 0) {
      const existing = items[idx];
      const next: CartItem = { ...existing, qty: existing.qty + qty };
      items[idx] = next;
    } else {
      items.unshift({ ...item, qty });
    }
    set({ items });
  },

  removeItem: (productId) => {
    set({ items: get().items.filter(i => i.productId !== productId) });
  },

  clear: () => set({ items: [] }),

  total: () => {
    return get().items.reduce((sum, it) => sum + it.price * it.qty, 0);
  },
}));