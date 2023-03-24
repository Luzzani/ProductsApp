import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={style.container}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={style.image}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 100,
  },
});
