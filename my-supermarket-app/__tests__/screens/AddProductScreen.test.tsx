import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddProductScreen from "../../src/screens/Stock/AddProductScreen";
import { addProduct } from "../../src/services/products";
import { useProductsStore } from "../../src/hooks/useProductsStore";

jest.mock("../../src/services/products");
jest.mock("../../src/hooks/useProductsStore");

const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}));

describe("AddProductScreen", () => {
  beforeEach(() => {
    (useProductsStore as unknown as jest.Mock).mockReturnValue({
      addProductLocal: jest.fn(),
    });
  });

  it("validates required fields", async () => {
    const { getByText, getByPlaceholderText } = render(<AddProductScreen />);
    fireEvent.press(getByText("Add"));
    expect(getByText("All fields are required.")).toBeTruthy();
  });

  it("calls addProduct and navigates back", async () => {
    (addProduct as jest.Mock).mockResolvedValue({
      productId: "2",
      name: "Banana",
      category: "Fruit",
      price: 2,
      stock: 5,
      unit: "kg",
    });
    const { getByText, getByPlaceholderText } = render(<AddProductScreen />);
    fireEvent.changeText(getByPlaceholderText("Name"), "Banana");
    fireEvent.changeText(getByPlaceholderText("Category"), "Fruit");
    fireEvent.changeText(getByPlaceholderText("Price"), "2");
    fireEvent.changeText(getByPlaceholderText("Stock"), "5");
    fireEvent.changeText(getByPlaceholderText("Unit (e.g. kg, pcs)"), "kg");
    fireEvent.press(getByText("Add"));
    await waitFor(() => expect(mockGoBack).toHaveBeenCalled());
  });

  it("shows error on addProduct failure", async () => {
    (addProduct as jest.Mock).mockRejectedValue(new Error("fail"));
    const { getByText, getByPlaceholderText, findByText } = render(
      <AddProductScreen />
    );
    fireEvent.changeText(getByPlaceholderText("Name"), "Banana");
    fireEvent.changeText(getByPlaceholderText("Category"), "Fruit");
    fireEvent.changeText(getByPlaceholderText("Price"), "2");
    fireEvent.changeText(getByPlaceholderText("Stock"), "5");
    fireEvent.changeText(getByPlaceholderText("Unit (e.g. kg, pcs)"), "kg");
    fireEvent.press(getByText("Add"));
    expect(await findByText("fail")).toBeTruthy();
  });
});
