import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../hooks/useCartStore';
import { createInvoice } from '../../services/invoices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  successText: {
    marginBottom: 8,
    color: '#16a34a',
  },
  navRow: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartHeader: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalText: {
    fontSize: 18,
  },
  emptyText: {
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
    paddingVertical: 8,
  },
  itemName: {
    fontWeight: '500',
  },
  itemDetails: {
    color: '#6b7280',
  },
  bottomRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default function POSScreen() {
  const navigation = useNavigation();
  const { items, addItem, removeItem, clear, total } = useCartStore();
  const [busy, setBusy] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const sum = useMemo(() => total(), [items, total]);

  const onCheckout = async () => {
    setSuccessMsg(null);
    if (items.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }
    try {
      setBusy(true);
      const lineItems = items.map(it => ({
        productId: it.productId,
        name: it.name,
        price: it.price,
        qty: it.qty,
        unit: it.unit,
      }));
      await createInvoice({
        items: lineItems,
        amountPaid: sum,
      });
      clear();
      setSuccessMsg('Invoice created');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Checkout failed';
      Alert.alert('Error', message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Point of Sale</Text>

      {successMsg ? <Text style={styles.successText}>{successMsg}</Text> : null}

      <View style={styles.navRow}>
        <PrimaryButton
          title="Go to Stock List"
          onPress={() => navigation.navigate('StockList' as never)}
          testID="btn-stock-list"
        />
        <PrimaryButton
          title="Add New Product"
          onPress={() => navigation.navigate('AddProduct' as never)}
          className="bg-green"
          testID="btn-add-product"
        />
      </View>

      <View style={styles.cartHeader}>
        <Text style={styles.cartTitle}>Cart</Text>
        <Text style={styles.totalText}>Total: {sum.toFixed(2)}</Text>
      </View>

      {items.length === 0 ? (
        <Text style={styles.emptyText}>No items in cart.</Text>
      ) : (
        <FlatList
          data={items as any}
          keyExtractor={(it: any) => it.productId}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }: any) => (
            <View style={styles.itemContainer}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  {item.qty} x {item.price} {item.unit}
                </Text>
              </View>
              <PrimaryButton
                title="Remove"
                className="bg-red"
                onPress={() => removeItem(item.productId)}
              />
            </View>
          )}
        />
      )}

      <View style={styles.bottomRow}>
        <PrimaryButton title="Clear" className="bg-gray" onPress={() => clear()} />
        <PrimaryButton
          title={busy ? 'Processing...' : 'Checkout'}
          onPress={onCheckout}
          disabled={busy || items.length === 0}
          testID="btn-checkout"
        />
      </View>
    </View>
  );
}