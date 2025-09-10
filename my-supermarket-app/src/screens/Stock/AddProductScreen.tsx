import React, { useState } from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { addProduct } from '../../services/products';
import { useProductsStore } from '../../hooks/useProductsStore';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddProduct'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    marginBottom: 12,
    color: '#dc2626',
  },
  formContainer: {
    gap: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttonRow: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
  },
});

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
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>Add Product</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                style={styles.input}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                value={category}
                onChangeText={setCategory}
                placeholder="Category"
                style={styles.input}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholder="Price"
                style={styles.input}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Stock</Text>
              <TextInput
                value={stock}
                onChangeText={setStock}
                keyboardType="number-pad"
                placeholder="Stock"
                style={styles.input}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Unit</Text>
              <TextInput
                value={unit}
                onChangeText={setUnit}
                placeholder="Unit (e.g. kg, pcs)"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <PrimaryButton title="Add" onPress={onAdd} testID="btn-add-product" />
            <PrimaryButton
              title="Cancel"
              className="bg-gray"
              onPress={() => navigation.goBack()}
              testID="btn-cancel"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}