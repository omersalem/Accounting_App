import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { useProductsStore } from '../../hooks/useProductsStore';
import { useAuthStore } from '../../hooks/useAuthStore';

type Nav = NativeStackNavigationProp<RootStackParamList, 'StockList'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  staffText: {
    color: '#6b7280',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemName: {
    fontSize: 16,
  },
  itemStock: {
    color: '#6b7280',
  },
});

export default function StockListScreen() {
  const navigation = useNavigation<Nav>();
  const { products, loading, error, loadProducts } = useProductsStore();
  const { role } = useAuthStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stock</Text>
        {role === 'Admin' ? (
          <PrimaryButton
            title="Add Product"
            className="bg-green"
            onPress={() => navigation.navigate('AddProduct')}
            testID="btn-add-product-from-list"
          />
        ) : (
          <Text style={styles.staffText}>Staff role</Text>
        )}
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>No products found.</Text>
      ) : (
        <FlatList
          data={products as any}
          keyExtractor={(item: any) => item.productId}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }: any) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemStock}>Qty: {item.stock}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}