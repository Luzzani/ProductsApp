import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Image,
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {ProductsStackParams} from '../navigation/ProductsNavigation';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route: {params}}: Props) => {
  const {id = '', name = ''} = params;

  const [tempUri, setTempUri] = useState<string>();

  const {categories} = useCategories();
  const {loadProductById, addProduct, updateProduct, upLoadImage} =
    useContext(ProductsContext);

  const {_id, categoriaId, img, nombre, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({
      header: () => header(nombre),
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo', quality: 0.5}, resp => {
      if (resp.didCancel) {
        return;
      } else if (!resp.assets) {
        return;
      }
      setTempUri(resp.assets[0].uri);
      upLoadImage(resp, _id);
    });
  };

  const header = (valueName: string) => {
    return (
      <Text style={styles.title}>
        {valueName ? valueName : 'Sin nombre del producto'}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="Producto"
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
          style={styles.textInput}
          placeholderTextColor={'rgba(0,0,0,0.4)'}
        />
        <Text style={styles.label}>Categoria:</Text>
        <Picker
          selectedValue={categoriaId}
          dropdownIconColor={'#5856D6'}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(c => {
            return (
              <Picker.Item
                color={'#000000'}
                label={c.nombre}
                value={c._id}
                key={c._id}
              />
            );
          })}
        </Picker>

        <Button title="Guardar" onPress={saveOrUpdate} color={'#5856D6'} />
        {_id.length > 0 && (
          <View style={styles.containerBtn}>
            <Button title="Cámara" onPress={takePhoto} color={'#5856D6'} />
            <Button title="Galería" onPress={() => {}} color={'#5856D6'} />
          </View>
        )}
        {img.length > 0 && !tempUri && (
          <Image source={{uri: img}} style={styles.image} />
        )}

        {tempUri && <Image source={{uri: tempUri}} style={styles.image} />}
        {tempUri && <Text>{tempUri}</Text>}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20},
  label: {color: '#000000', fontSize: 18, fontWeight: '500'},
  text: {color: '#000000'},
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  textInput: {
    color: '#000000',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 10,
    marginBottom: 15,
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    columnGap: 10,
  },
  image: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
});
