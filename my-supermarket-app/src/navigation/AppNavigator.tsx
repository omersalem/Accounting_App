import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import POSScreen from '../screens/POS/POSScreen';
import { StockListScreen, AddProductScreen } from '../screens/Stock';
import AuthNavigator from './AuthNavigator';
import { useAuthStore } from '../hooks/useAuthStore';
import { signOutUser } from '../services/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, loading, initAuthListener } = useAuthStore();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  return (
    <NavigationContainer>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      ) : user ? (
        <Stack.Navigator
          initialRouteName="POS"
          screenOptions={{
            headerRight: () => (
              <Pressable
                accessibilityRole="button"
                onPress={() => signOutUser()}
                className="px-3 py-1"
              >
                <Text className="text-blue-600">Sign Out</Text>
              </Pressable>
            ),
          }}
        >
          <Stack.Screen name="POS" component={POSScreen} options={{ title: 'Point of Sale' }} />
          <Stack.Screen name="StockList" component={StockListScreen} options={{ title: 'Stock' }} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}