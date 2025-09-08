import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../hooks/useCartStore';
import { createInvoice } from '../../services/invoices';

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
    <View className="flex-1 bg-white p-6">
      <Text className="mb-4 text-2xl font-bold">Point of Sale</Text>

      {successMsg ? <Text className="mb-2 text-green-600">{successMsg}</Text> : null}

      <View className="mb-3 flex-row items-center justify-between">
        <PrimaryButton
          title="Go to Stock List"
          onPress={() => navigation.navigate('StockList' as never)}
          testID="btn-stock-list"
        />
        <PrimaryButton
          title="Add New Product"
          onPress={() => navigation.navigate('AddProduct' as never)}
          className="bg-green-600"
          testID="btn-add-product"
        />
      </View>

      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold">Cart</Text>
        <Text className="text-lg">Total: {sum.toFixed(2)}</Text>
      </View>

      {items.length === 0 ? (
        <Text className="text-gray-500">No items in cart.</Text>
      ) : (
        <FlatList
          data={items as any}
          keyExtractor={(it: any) => it.productId}
          ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
          renderItem={({ item }: any) => (
            <View className="flex-row items-center justify-between py-2">
              <View>
                <Text className="font-medium">{item.name}</Text>
                <Text className="text-gray-600">
                  {item.qty} x {item.price} {item.unit}
                </Text>
              </View>
              <PrimaryButton
                title="Remove"
                className="bg-red-600"
                onPress={() => removeItem(item.productId)}
              />
            </View>
          )}
        />
      )}

      <View className="mt-4 flex-row items-center justify-between">
        <PrimaryButton title="Clear" className="bg-gray-500" onPress={() => clear()} />
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