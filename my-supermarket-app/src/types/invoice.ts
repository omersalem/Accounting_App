import type { Product } from "./product";

export type Invoice = {
  readonly invoiceId: string;
  readonly date: string; // ISO string
  readonly customerId: string;
  readonly items: readonly {
    readonly productId: string;
    readonly quantity: number;
    readonly price: number;
  }[];
  readonly total: number;
};
