import React from 'react'
import { render } from '@testing-library/react'
import SearchBar from './SearchBar'

test('renders search bar', () => {
  const { getByRole } = render(<SearchBar />)
  const searchBtn = getByRole(/Search/i)
  expect(searchBtn).toBeInTheDocument()
})
