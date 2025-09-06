import { create } from 'zustand';
import type { Product } from '../types/product';

type ProductsState = {
  products: readonly Product[];
  loading: boolean;
  error?: string;
  loadProducts: () => void | Promise<void>;
  addProductLocal: (product: Product) => void;
};

export const useProductsStore = create<ProductsState>(() => ({
  // Default no-op state; tests will mock this hook with concrete values.
  products: [],
  loading: false,
  error: undefined,
  loadProducts: () => {},
  addProductLocal: () => {},
}));
