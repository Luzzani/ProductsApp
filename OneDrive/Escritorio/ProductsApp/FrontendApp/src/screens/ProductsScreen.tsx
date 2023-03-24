import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {Producto} from '../interfaces/interface';
import {ProductsContext} from '../context/ProductsContext';
import {ProductsStackParams} from '../navigation/ProductsNavigation';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headeRright(),
    });
  }, []);

  const headeRright = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.addButton}
        onPress={() => navigation.navigate('ProductScreen', {})}>
        <Text style={styles.text}>Agregar</Text>
      </TouchableOpacity>
    );
  };

  const renderItems = (item: Producto) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductScreen', {
            id: item._id,
            name: item.nombre,
          })
        }>
        <Text style={styles.text}>{item.nombre}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemSeparetor = () => {
    return <View style={styles.itemSeparator} />;
  };

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => renderItems(item)}
        ItemSeparatorComponent={renderItemSeparetor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {color: '#000000'},
  itemSeparator: {
    borderBottomWidth: 1,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  addButton: {
    marginRight: 10,
  },
});
