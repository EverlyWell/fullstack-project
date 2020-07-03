import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import Cookies from 'js-cookie'
import { createStore } from 'redux'
import axios from 'axios'

import Favorites from '../Favorites'
import reducer from '../reducers/index'

const store = createStore(reducer)

jest.mock('axios')

test('load favorited images', async () => {
  Cookies.set('userToken', 'abc')
  axios.get.mockResolvedValue({ data: [
    { id: 1, source_id: 'abc', url: '/cat.gif', origin_url: '/', favorite: true },
    { id: 2, source_id: 'def', url: '/dog.gif', origin_url: '/', favorite: true }
  ]})

  await act(async () => {
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    )
  })

  expect(screen.queryAllByRole('img').length).toBe(2)
})

test('removes image from favorites', async () => {
  Cookies.set('userToken', 'abc')
  axios.get.mockResolvedValue({ data: [
    { id: 1, source_id: 'abc', url: '/cat.gif', origin_url: '/', favorite: true }
  ]})
  axios.delete.mockResolvedValue({ data: {} })

  await act(async () => {
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    )
  })
  expect(screen.queryByTestId('favorite-icon')).toBeInTheDocument()

  await act(async () => {
    fireEvent.click(screen.getByTestId('toggle-favorite'))
  })

  expect(screen.queryByRole('img')).not.toBeInTheDocument()
})
