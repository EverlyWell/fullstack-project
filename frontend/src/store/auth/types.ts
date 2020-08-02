export interface AuthState {
  loggedIn: boolean;
  token: string;
  email: string;
}

export const UPDATE_TOKEN = 'UPDATE_TOKEN';

interface UpdateTokenAction {
  type: typeof UPDATE_TOKEN;
  payload: string;
}

export type AuthActionTypes = UpdateTokenAction;
