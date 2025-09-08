import React from 'react';
import { render } from '@testing-library/react-native';
import StockListScreen from '../../src/screens/Stock/StockListScreen';

// Mock products store to avoid real Firestore and control UI states
jest.mock('../../src/hooks/useProductsStore', () => ({
  useProductsStore: jest.fn(() => ({
    products: [],
    loading: false,
    error: undefined,
    loadProducts: jest.fn(),
  })),
}));

// Navigation mock (only what's used)
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    addListener: jest.fn(() => jest.fn()),
  }),
}));

// Mock auth store as a function we can control per test (avoid multiple React copies)
jest.mock('../../src/hooks/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

const { useAuthStore } = require('../../src/hooks/useAuthStore') as {
  useAuthStore: jest.Mock;
};

describe('StockListScreen role guard', () => {
  beforeEach(() => {
    useAuthStore.mockReset();
  });

  it('hides "Add Product" for Staff role', () => {
    useAuthStore.mockReturnValue({ role: 'Staff' });
    const { queryByText } = render(<StockListScreen />);
    expect(queryByText('Add Product')).toBeNull();
    expect(queryByText('Staff role')).toBeTruthy();
  });

  it('shows "Add Product" for Admin role', () => {
    useAuthStore.mockReturnValue({ role: 'Admin' });
    const { getByText } = render(<StockListScreen />);
    expect(getByText('Add Product')).toBeTruthy();
  });
});