import type { LineItem, Invoice } from '../../src/types/invoice';

// Mock auth store: default Admin; override via useAuthStore.getState.mockReturnValue(...)
jest.mock('../../src/hooks/useAuthStore', () => {
  const mockGetState = jest.fn(() => ({ role: 'Admin' }));
  return { useAuthStore: { getState: mockGetState } };
});

// Mock Firestore helpers with explicit params (avoid TS spread issues)
const mockAddDocTyped = jest.fn(async (_col: unknown, _data: unknown) => ({} as unknown));
const mockGetDocsTyped = jest.fn(async (_col?: unknown) => [] as Invoice[]);
jest.mock('../../src/services/firestore', () => ({
  col: jest.fn(() => ({})),
  addDocTyped: (col: unknown, data: unknown) => mockAddDocTyped(col, data),
  getDocsTyped: (col: unknown) => mockGetDocsTyped(col),
}));

describe('invoices service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates invoice and computes totals/status = PAID', async () => {
    const items: LineItem[] = [
      { productId: 'p1', name: 'A', price: 2, qty: 2, unit: 'kg' }, // 4
      { productId: 'p2', name: 'B', price: 3, qty: 3, unit: 'pcs' }, // 9, total 13
    ];
    const { createInvoice } = require('../../src/services/invoices');
    const inv = await createInvoice({
      items,
      amountPaid: 13,
    });
    expect(inv.totalAmount).toBe(13);
    expect(inv.amountPaid).toBe(13);
    expect(inv.status).toBe('PAID');
    expect(mockAddDocTyped).toHaveBeenCalled();
  });

  it('rejects when role is not permitted', async () => {
    const { useAuthStore } = require('../../src/hooks/useAuthStore') as {
      useAuthStore: { getState: jest.Mock };
    };
    useAuthStore.getState.mockReturnValue({ role: null });
    const { createInvoice: createForbidden } = require('../../src/services/invoices');
    await expect(
      createForbidden({
        items: [{ productId: 'x', name: 'X', price: 1, qty: 1, unit: 'pcs' }],
        amountPaid: 1,
      })
    ).rejects.toThrow('Forbidden');
  });

  it('filters invoices by date range', async () => {
    const data: Invoice[] = [
      {
        invoiceId: '1',
        invoiceNumber: 'INV-1',
        date: '2024-01-01T00:00:00.000Z',
        items: [],
        totalAmount: 0,
        amountPaid: 0,
        status: 'UNPAID',
      },
      {
        invoiceId: '2',
        invoiceNumber: 'INV-2',
        date: '2024-02-15T00:00:00.000Z',
        items: [],
        totalAmount: 0,
        amountPaid: 0,
        status: 'UNPAID',
      },
      {
        invoiceId: '3',
        invoiceNumber: 'INV-3',
        date: '2024-03-20T00:00:00.000Z',
        items: [],
        totalAmount: 0,
        amountPaid: 0,
        status: 'UNPAID',
      },
    ];
    (mockGetDocsTyped as unknown as jest.Mock).mockResolvedValueOnce(data as unknown);

    const { listInvoicesByDate } = require('../../src/services/invoices');
    const res = await listInvoicesByDate({
      startISO: '2024-02-01T00:00:00.000Z',
      endISO: '2024-03-01T00:00:00.000Z',
    });
    expect(res.map((r: Invoice) => r.invoiceId)).toEqual(['2']);
  });
});