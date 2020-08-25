import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Image Search', () => {
  const { getByText } = render(<App />);
  expect(getByText('Image Search')).toBeInTheDocument()
});
