import { listProducts, addProduct } from "../../src/services/products";
import { Product } from "../../src/types/product";

jest.mock("../../src/services/firestore", () => ({
  col: jest.fn(() => ({})),
  addDocTyped: jest.fn(async (_col, data) => ({ id: "mock-id", ...data })),
  getDocsTyped: jest.fn(async () => [
    {
      productId: "1",
      name: "Apple",
      category: "Fruit",
      price: 1,
      stock: 10,
      unit: "kg",
    },
  ]),
}));

describe("products service", () => {
  it("listProducts returns products", async () => {
    const products = await listProducts();
    expect(products).toEqual([
      {
        productId: "1",
        name: "Apple",
        category: "Fruit",
        price: 1,
        stock: 10,
        unit: "kg",
      },
    ]);
  });

  it("addProduct returns new product with id", async () => {
    const input = {
      name: "Banana",
      category: "Fruit",
      price: 2,
      stock: 5,
      unit: "kg",
    };
    const product = await addProduct(input);
    expect(product).toHaveProperty("productId");
    expect(product.name).toBe("Banana");
  });

  it("handles errors in addProduct", async () => {
    jest
      .spyOn(require("../../src/services/firestore"), "addDocTyped")
      .mockRejectedValueOnce(new Error("fail"));
    await expect(
      addProduct({ name: "X", category: "Y", price: 1, stock: 1, unit: "pcs" })
    ).rejects.toThrow("fail");
  });
});
