import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Usuario,
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/interface';
import {authReducer, AuthState} from './authReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'no-authenticated';
  signIn: (loginData: LoginData) => void;
  signUp: (registerData: RegisterData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = AsyncStorage.getItem('token');
    if (!token) return dispatch({type: 'notAuthenticated'});

    const {data, status} = await cafeApi.get('/auth');

    if (status !== 200) {
      dispatch({type: 'notAuthenticated'});
      return;
    }

    await AsyncStorage.setItem('token', data.token);

    dispatch({
      type: 'signUp',
      payload: {token: data.token, user: data.usuario},
    });
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });

      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta',
      });
    }
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const signUp = async ({correo, nombre, password}: RegisterData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });

      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Información incorrecta',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
