export type LineItem = {
  readonly productId: string;
  readonly name: string;
  readonly price: number; // unit price
  readonly qty: number;
  readonly unit: string; // e.g., "kg", "pcs"
};

export type InvoiceStatus = 'PAID' | 'UNPAID';

export type Invoice = {
  readonly invoiceId: string;
  readonly invoiceNumber: string;
  readonly customerId?: string;
  readonly date: string; // ISO string
  readonly items: readonly LineItem[];
  readonly totalAmount: number;
  readonly amountPaid: number;
  readonly status: InvoiceStatus;
};
