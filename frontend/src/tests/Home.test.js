import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import Cookies from 'js-cookie'
import { createStore } from 'redux'
import axios from 'axios'

import Home from '../Home'
import reducer from '../reducers/index'

const store = createStore(reducer)

jest.mock('axios')

test('load initial images', async () => {
  Cookies.set('userToken', 'abc')
  axios.get.mockResolvedValue({ data: [
    { source_id: 'abc', url: '/cat.gif', origin_url: '/' },
    { source_id: 'def', url: '/dog.gif', origin_url: '/' }
  ]})

  await act(async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  })

  expect(screen.queryAllByRole('img').length).toBe(2)
})

test('load more images', async () => {
  Cookies.set('userToken', 'abc')
  axios.get
       .mockResolvedValueOnce({ data: [
         { source_id: 'abc', url: '/cat.gif', origin_url: '/' },
         { source_id: 'def', url: '/dog.gif', origin_url: '/' }
       ]})
       .mockResolvedValueOnce({ data: [
        { source_id: 'ghi', url: '/bird.gif', origin_url: '/' },
        { source_id: 'jkl', url: '/ferret.gif', origin_url: '/' }
      ]})

  await act(async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  })

  await act(async () => {
    fireEvent.click(screen.getByText('Load More'))
  })

  expect(screen.queryAllByRole('img').length).toBe(4)
})

test('marks image as favorite', async () => {
  Cookies.set('userToken', 'abc')
  axios.get.mockResolvedValue({ data: [
    { source_id: 'abc', url: '/cat.gif', origin_url: '/' }
  ]})
  axios.post.mockResolvedValue({ data: [
    { id: 123, source_id: 'abc', url: '/cat.gif', origin_url: '/', favorite: true }
  ]})

  await act(async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  })

  await act(async () => {
    fireEvent.click(screen.getByTestId('toggle-favorite'))
  })

  expect(screen.queryByTestId('favorite-icon')).toBeInTheDocument()
})
