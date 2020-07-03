import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import Cookies from 'js-cookie'
import { createStore } from 'redux'

import App from './App'
import reducer from './reducers/index'

const store = createStore(reducer)

test('redirects to login if unauthenticated', () => {
  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })

  expect(screen.queryByTestId('home-page')).not.toBeInTheDocument()
  expect(screen.queryByTestId('login-page')).toBeInTheDocument()
})

test('shows home page if authenticated', () => {
  Cookies.set('userToken', 'abc')

  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })

  expect(screen.queryByTestId('home-page')).toBeInTheDocument()
  expect(screen.queryByTestId('login-page')).not.toBeInTheDocument()
})
