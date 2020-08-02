import { UPDATE_TOKEN, AuthActionTypes } from './types'

export function updateToken(newToken: string): AuthActionTypes {
  return {
    type: UPDATE_TOKEN,
    payload: newToken
  }
}