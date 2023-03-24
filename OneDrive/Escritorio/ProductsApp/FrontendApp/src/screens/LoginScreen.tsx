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
import {StackScreenProps} from '@react-navigation/stack';

import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';
import {WhiteLogo} from '../components/WhiteLogo';
import {AuthContext} from '../context/AuthContext';
import {Background} from '../components/Background';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {email, password, onChange} = useForm({email: '', password: ''});

  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Login incorrecto', errorMessage, [
      {text: 'ok', onPress: () => removeError()},
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    Keyboard.dismiss();

    signIn({correo: email, password});
  };
  return (
    <>
      {/* background */}
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          {/* keyboard avoid view*/}
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            placeholder="Ingrese su email"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            underlineColorAndroid="#FFFFFF"
            selectionColor="#FFFFFF"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onSubmitEditing={onLogin}
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
            onSubmitEditing={onLogin}
            onChangeText={value => {
              onChange(value, 'password');
            }}
            secureTextEntry
          />

          {/* boton login */}
          <View style={loginStyles.containerButton}>
            <TouchableOpacity activeOpacity={0.8} style={loginStyles.button}>
              <Text style={loginStyles.buttonText} onPress={onLogin}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {/* crear una nueva cuenta */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>New Acount</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
