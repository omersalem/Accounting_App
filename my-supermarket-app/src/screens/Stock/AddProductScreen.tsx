import React, { useState } from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { addProduct } from '../../services/products';
import { useProductsStore } from '../../hooks/useProductsStore';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddProduct'>;

export default function AddProductScreen() {
  const navigation = useNavigation<Nav>();
  const { addProductLocal } = useProductsStore();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onAdd = async () => {
    setError(null);

    if (!name.trim() || !category.trim() || !price.trim() || !stock.trim() || !unit.trim()) {
      setError('All fields are required.');
      return;
    }

    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (Number.isNaN(priceNum) || Number.isNaN(stockNum)) {
      setError('Price and Stock must be valid numbers.');
      return;
    }

    try {
      const product = await addProduct({
        name: name.trim(),
        category: category.trim(),
        price: priceNum,
        stock: stockNum,
        unit: unit.trim(),
      });
      // optimistic/local update hook (no-op in default impl; mocked in tests)
      addProductLocal(product);
      navigation.goBack();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Something went wrong';
      setError(message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 p-6">
          <Text className="mb-4 text-2xl font-bold">Add Product</Text>

          {error ? <Text className="mb-3 text-red-600">{error}</Text> : null}

          <View className="gap-4">
            <View>
              <Text className="mb-2 text-base">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>

            <View>
              <Text className="mb-2 text-base">Category</Text>
              <TextInput
                value={category}
                onChangeText={setCategory}
                placeholder="Category"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>

            <View>
              <Text className="mb-2 text-base">Price</Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholder="Price"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>

            <View>
              <Text className="mb-2 text-base">Stock</Text>
              <TextInput
                value={stock}
                onChangeText={setStock}
                keyboardType="number-pad"
                placeholder="Stock"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>

            <View>
              <Text className="mb-2 text-base">Unit</Text>
              <TextInput
                value={unit}
                onChangeText={setUnit}
                placeholder="Unit (e.g. kg, pcs)"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>
          </View>

          <View className="mt-6 flex-row gap-3">
            <PrimaryButton title="Add" onPress={onAdd} testID="btn-add-product" />
            <PrimaryButton
              title="Cancel"
              className="bg-gray-500"
              onPress={() => navigation.goBack()}
              testID="btn-cancel"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}