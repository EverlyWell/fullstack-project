import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import Cookies from 'js-cookie'
import { createStore } from 'redux'
import axios from 'axios'

import Login from '../Login'
import reducer from '../reducers/index'

const email = 'test@example.com'
const password = 'P@ssw0rd'
const mockFunc = jest.fn()

jest.mock('axios')
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockFunc,
  }),
}))

const store = createStore(reducer)

test('logins', async () => {
  await act(async () => {
    axios.post.mockResolvedValue({ data: { auth: 'abc' } })

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: email } })
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: password } })

    fireEvent.click(screen.getByRole('button'))
  })

  expect(Cookies.get('userToken')).toBe('abc')
  expect(mockFunc).toHaveBeenCalledWith('/')
})

test('displays with error', async () => {
  await act(async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Login Error' } } })

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: email } })
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: password } })

    fireEvent.click(screen.getByRole('button'))
  })

  expect(screen.queryByText('Login Error')).toBeInTheDocument()
})
