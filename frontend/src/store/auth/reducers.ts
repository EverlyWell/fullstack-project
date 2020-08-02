import { AuthState, AuthActionTypes, UPDATE_TOKEN } from './types'

const initialState: AuthState = {
  loggedIn: false,
  token: '',
  email: ''
}

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return {
        ...state,
        token: action.payload
      }
    }
    default:
      return state
  }
}