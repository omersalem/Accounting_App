import { type Invoice, type LineItem } from '../types/invoice';

const COLLECTION = 'invoices';

export type CreateInvoiceInput = {
  readonly customerId?: string;
  readonly items: readonly LineItem[];
  readonly amountPaid: number;
  readonly date?: string; // allow override in tests
};

export type DateRange = {
  readonly startISO: string; // inclusive
  readonly endISO: string;   // inclusive
};

// Lazy-require firestore helpers so tests can mock Firestore and avoid ESM at module eval
export async function listInvoicesByDate(range: DateRange): Promise<readonly Invoice[]> {
  const { col, getDocsTyped } = require('./firestore') as typeof import('./firestore');
  // For now we fetch all and filter client-side (keeps tests simple). In production, query with where.
  const all = await getDocsTyped<Invoice>(col<Invoice>(COLLECTION));
  const start = new Date(range.startISO).getTime();
  const end = new Date(range.endISO).getTime();
  return all.filter(inv => {
    const t = new Date(inv.date).getTime();
    return t >= start && t <= end;
  });
}

export async function createInvoice(input: CreateInvoiceInput): Promise<Invoice> {
  // Staff and Admin can create invoices
  const { useAuthStore } = require('../hooks/useAuthStore') as typeof import('../hooks/useAuthStore');
  const role = (useAuthStore as any)?.getState?.().role;

  if (role !== 'Admin' && role !== 'Staff') {
    throw new Error('Forbidden: authentication required');
  }

  if (!input.items || input.items.length === 0) {
    throw new Error('Invoice must contain at least one line item');
  }

  const totalAmount = input.items.reduce((sum, it) => sum + it.price * it.qty, 0);
  if (totalAmount < 0 || input.amountPaid < 0) {
    throw new Error('Invalid totals');
  }

  const status = input.amountPaid >= totalAmount ? 'PAID' : 'UNPAID' as const;

  // Generate client id/number for tests; Firestore will persist these fields.
  const nowISO = input.date ?? new Date().toISOString();
  const invoiceId = String(Date.now());
  const invoiceNumber = `INV-${invoiceId}`;

  const invoice: Invoice = {
    invoiceId,
    invoiceNumber,
    customerId: input.customerId,
    date: nowISO,
    items: input.items,
    totalAmount,
    amountPaid: input.amountPaid,
    status,
  };

  const { col, addDocTyped } = require('./firestore') as typeof import('./firestore');
  await addDocTyped(col<Invoice>(COLLECTION), invoice);
  return invoice;
}