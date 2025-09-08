import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { useProductsStore } from '../../hooks/useProductsStore';
import { useAuthStore } from '../../hooks/useAuthStore';

type Nav = NativeStackNavigationProp<RootStackParamList, 'StockList'>;

export default function StockListScreen() {
  const navigation = useNavigation<Nav>();
  const { products, loading, error, loadProducts } = useProductsStore();
  const { role } = useAuthStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-bold">Stock</Text>
        {role === 'Admin' ? (
          <PrimaryButton
            title="Add Product"
            className="bg-green-600"
            onPress={() => navigation.navigate('AddProduct')}
            testID="btn-add-product-from-list"
          />
        ) : (
          <Text className="text-gray-500">Staff role</Text>
        )}
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : products.length === 0 ? (
        <Text className="text-center text-gray-500">No products found.</Text>
      ) : (
        <FlatList
          data={products as any}
          keyExtractor={(item: any) => item.productId}
          ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
          renderItem={({ item }: any) => (
            <View className="flex-row items-center justify-between py-3">
              <Text className="text-base">{item.name}</Text>
              <Text className="text-gray-600">Qty: {item.stock}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}