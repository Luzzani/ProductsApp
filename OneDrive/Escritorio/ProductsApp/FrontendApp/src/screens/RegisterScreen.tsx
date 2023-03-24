import React, {useContext, useEffect} from 'react';
import {
  Text,
  TextInput,
  Platform,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';

import {loginStyles} from '../theme/loginTheme';
import {WhiteLogo} from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {Background} from '../components/Background';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {email, password, onChange, name} = useForm({
    email: '',
    password: '',
    name: '',
  });
  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage, [
      {text: 'ok', onPress: () => removeError()},
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    console.log(email, password, name);
    Keyboard.dismiss();
    signUp({correo: email, nombre: name, password});
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          {/* keyboard avoid view*/}
          <WhiteLogo />

          <Text style={loginStyles.title}>Registro</Text>
          <Text style={loginStyles.label}>Name:</Text>
          <TextInput
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            placeholder="Name"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            underlineColorAndroid="#FFFFFF"
            selectionColor="#FFFFFF"
            autoCapitalize="none"
            autoCorrect={false}
            value={name}
            onSubmitEditing={onRegister}
            onChangeText={value => {
              onChange(value, 'name');
            }}
          />
          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            placeholder="Email"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            underlineColorAndroid="#FFFFFF"
            selectionColor="#FFFFFF"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onSubmitEditing={onRegister}
            onChangeText={value => {
              onChange(value, 'email');
            }}
          />
          <Text style={loginStyles.label}>Password:</Text>
          <TextInput
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            placeholder="********"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid="#FFFFFF"
            selectionColor="#FFFFFF"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onSubmitEditing={onRegister}
            onChangeText={value => {
              onChange(value, 'password');
            }}
            secureTextEntry
          />
          {/* boton login */}
          <View style={loginStyles.containerButton}>
            <TouchableOpacity activeOpacity={0.8} style={loginStyles.button}>
              <Text style={loginStyles.buttonText} onPress={onRegister}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
          {/* crear una nueva cuenta */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('LoginScreen')}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
