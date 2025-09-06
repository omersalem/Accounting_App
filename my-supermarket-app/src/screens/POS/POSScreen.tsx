import React from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

export default function POSScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="mb-6 text-2xl font-bold">Point of Sale</Text>

      <View className="w-full gap-3">
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
    </View>
  );
}