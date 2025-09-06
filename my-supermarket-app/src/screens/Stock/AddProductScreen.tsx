import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddProduct'>;

export default function AddProductScreen() {
  const navigation = useNavigation<Nav>();

  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const onSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Product name is required.');
      return;
    }
    const purchase = Number(purchasePrice);
    const sale = Number(salePrice);
    const qty = Number(quantity);

    if (Number.isNaN(purchase) || Number.isNaN(sale) || Number.isNaN(qty)) {
      Alert.alert('Validation', 'Purchase price, sale price, and quantity must be valid numbers.');
      return;
    }

    // Placeholder for persistence (will integrate Firebase per docs later)
    Alert.alert('Success', `Saved "${name}" (Qty ${qty})`);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 p-6">
          <Text className="mb-4 text-2xl font-bold">Add Product</Text>

          <View className="gap-4">
            <View>
              <Text className="mb-2 text-base">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g., Milk 1L"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>

            <View>
              <Text className="mb-2 text-base">Purchase Price</Text>
              <TextInput
                value={purchasePrice}
                onChangeText={setPurchasePrice}
                keyboardType="decimal-pad"
                placeholder="e.g., 2.50"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>

            <View>
              <Text className="mb-2 text-base">Sale Price</Text>
              <TextInput
                value={salePrice}
                onChangeText={setSalePrice}
                keyboardType="decimal-pad"
                placeholder="e.g., 3.50"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>

            <View>
              <Text className="mb-2 text-base">Quantity</Text>
              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="number-pad"
                placeholder="e.g., 10"
                className="rounded-md border border-gray-300 px-4 py-3"
              />
            </View>
          </View>

          <View className="mt-6 flex-row gap-3">
            <PrimaryButton title="Save" onPress={onSave} testID="btn-save-product" />
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