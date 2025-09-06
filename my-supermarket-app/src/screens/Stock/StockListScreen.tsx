import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'StockList'>;

const MOCK_STOCK = [
  { id: '1', name: 'Milk', quantity: 15 },
  { id: '2', name: 'Bread', quantity: 30 },
  { id: '3', name: 'Eggs', quantity: 42 },
];

export default function StockListScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-bold">Stock</Text>
        <PrimaryButton
          title="Add Product"
          className="bg-green-600"
          onPress={() => navigation.navigate('AddProduct')}
          testID="btn-add-product-from-list"
        />
      </View>

      <FlatList
        data={MOCK_STOCK}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between py-3">
            <Text className="text-base">{item.name}</Text>
            <Text className="text-gray-600">Qty: {item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500">No products found.</Text>
        )}
      />
    </View>
  );
}