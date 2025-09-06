import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import POSScreen from '../screens/POS/POSScreen';
import { StockListScreen, AddProductScreen } from '../screens/Stock';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="POS">
        <Stack.Screen name="POS" component={POSScreen} options={{ title: 'Point of Sale' }} />
        <Stack.Screen name="StockList" component={StockListScreen} options={{ title: 'Stock' }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}