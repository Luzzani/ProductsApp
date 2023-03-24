import {Usuario} from '../interfaces/interface';
export interface AuthState {
  status: 'checking' | 'authenticated' | 'no-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        user: null,
        token: null,
        status: 'no-authenticated',
      };

    case 'removeError':
      return {...state, errorMessage: ''};

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };

    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'no-authenticated',
        user: null,
        token: null,
      };

    default:
      return state;
  }
};
