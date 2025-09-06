export type Product = {
  readonly productId: string;
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly stock: number;
  readonly unit: string; // e.g., "kg", "pcs"
};
