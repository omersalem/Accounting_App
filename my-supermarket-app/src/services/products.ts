import { Product } from "../types/product";

const COLLECTION = "products";

// Lazy-require firestore helpers so tests that mock this module don't evaluate firebase ESM
export async function listProducts(): Promise<readonly Product[]> {
  const { col, getDocsTyped } = require("./firestore") as typeof import("./firestore");
  return getDocsTyped<Product>(col<Product>(COLLECTION));
}

export async function addProduct(
  input: Omit<Product, "productId">
): Promise<Product> {
  const { col, addDocTyped } = require("./firestore") as typeof import("./firestore");
  const productId = String(Date.now());
  const product: Product = { ...input, productId };
  await addDocTyped(col<Product>(COLLECTION), product);
  return product;
}
