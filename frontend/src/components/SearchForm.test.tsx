import React from 'react';
import { render } from '@testing-library/react';
import SearchForm from './SearchForm';

test('renders submit button', () => {
  const { getByText } = render(<SearchForm />);
  const searchButtonElement = getByText(/search/i);
  expect(searchButtonElement).toBeInTheDocument();
});
