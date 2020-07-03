import axios from 'axios'

export function registerUser(email, password) {
  return axios.post('/api/users', {
    email,
    password
  })
}

export function userLogin(email, password) {
  return axios.post('/api/users/login', {
    email,
    password
  })
}
