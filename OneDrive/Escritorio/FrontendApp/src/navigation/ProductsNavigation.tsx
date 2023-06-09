import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProductScreen} from '../screens/ProductScreen';

export type ProductsStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
};

const Stack = createStackNavigator();

export const ProductsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#FFFFFF'},
        headerStyle: {elevation: 0, shadowColor: 'transparent'},
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{title: 'Productos'}}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
