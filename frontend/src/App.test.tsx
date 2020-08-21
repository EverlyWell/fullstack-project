import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders search form', () => {
  const { getByText } = render(<App />);
  const searchElement = getByText(/search/i);
  expect(searchElement).toBeInTheDocument();
});
