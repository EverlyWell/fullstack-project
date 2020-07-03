import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import Cookies from 'js-cookie'
import { createStore } from 'redux'
import axios from 'axios'

import App from '../App'
import reducer from '../reducers/index'

const store = createStore(reducer)

jest.mock('axios')

test('redirects to login if unauthenticated', () => {
  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })

  expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
  expect(screen.queryByTestId('login-page')).toBeInTheDocument()
})

test('shows home page if authenticated', async () => {
  Cookies.set('userToken', 'abc')
  axios.get.mockResolvedValue({ data: [] })

  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })

  expect(screen.queryByTestId('home-page')).toBeInTheDocument()
  expect(screen.queryByTestId('login-page')).not.toBeInTheDocument()
})
