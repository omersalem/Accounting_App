import { useCartStore } from '../../src/hooks/useCartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset store
    useCartStore.setState({ items: [] });
  });

  it('adds new items and increases qty for existing', () => {
    useCartStore.getState().addItem({ productId: 'p1', name: 'Apple', price: 2, unit: 'kg' }, 1);
    useCartStore.getState().addItem({ productId: 'p1', name: 'Apple', price: 2, unit: 'kg' }, 2);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ productId: 'p1', qty: 3, price: 2 });
  });

  it('removes items by productId', () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem({ productId: 'p1', name: 'Apple', price: 2, unit: 'kg' }, 1);
    addItem({ productId: 'p2', name: 'Milk', price: 3, unit: 'pcs' }, 1);
    removeItem('p1');
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].productId).toBe('p2');
  });

  it('clears cart', () => {
    const { addItem, clear } = useCartStore.getState();
    addItem({ productId: 'p1', name: 'Apple', price: 2, unit: 'kg' }, 1);
    clear();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('computes total', () => {
    const s = useCartStore.getState();
    s.addItem({ productId: 'p1', name: 'A', price: 2, unit: 'kg' }, 2); // 4
    s.addItem({ productId: 'p2', name: 'B', price: 3.5, unit: 'pcs' }, 3); // 10.5
    expect(s.total()).toBeCloseTo(14.5);
  });
});