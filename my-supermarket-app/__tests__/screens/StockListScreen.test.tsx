import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import StockListScreen from "../../src/screens/Stock/StockListScreen";
import { useProductsStore } from "../../src/hooks/useProductsStore";

jest.mock("../../src/hooks/useProductsStore");

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    addListener: jest.fn(() => jest.fn()),
  }),
}));

describe("StockListScreen", () => {
  it("renders products", () => {
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      products: [
        {
          productId: "1",
          name: "Apple",
          category: "Fruit",
          price: 1,
          stock: 10,
          unit: "kg",
        },
      ],
      loading: false,
      error: undefined,
      loadProducts: jest.fn(),
    });
    const { getByText } = render(<StockListScreen />);
    expect(getByText("Apple")).toBeTruthy();
  });

  it("shows empty state", () => {
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: undefined,
      loadProducts: jest.fn(),
    });
    const { getByText } = render(<StockListScreen />);
    expect(getByText("No products found.")).toBeTruthy();
  });

  it("shows loading", () => {
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      loading: true,
      error: undefined,
      loadProducts: jest.fn(),
    });
    const { getByText } = render(<StockListScreen />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("shows error", () => {
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: "fail",
      loadProducts: jest.fn(),
    });
    const { getByText } = render(<StockListScreen />);
    expect(getByText("fail")).toBeTruthy();
  });
});
