import { create } from 'zustand';
import type { Product } from '../types/product';

type ProductsState = {
  products: readonly Product[];
  loading: boolean;
  error?: string;
  loadProducts: () => Promise<void>;
  addProductLocal: (product: Product) => void;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: undefined,

  loadProducts: async () => {
    try {
      set({ loading: true, error: undefined });
      // Lazy import to avoid pulling firebase in test init
      const { listProducts } = await import('../services/products');
      const items = await listProducts();
      set({ products: items, loading: false, error: undefined });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to load products';
      set({ loading: false, error: message });
    }
  },

  addProductLocal: (product) => {
    const cur = get().products;
    set({ products: [product, ...cur] });
  },
}));
