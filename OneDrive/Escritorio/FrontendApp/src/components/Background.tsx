import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Background = () => {
  return (
    <View style={{...style.background, transform: [{rotate: '-70deg'}]}} />
  );
};

const style = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#5856D6',
    width: 1000,
    height: 1200,
    top: -350,
  },
});
