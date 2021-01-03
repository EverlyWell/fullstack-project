import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders application', () => {
  const { getByText } = render(<App />);

  const title = getByText(/Gif Image Search App/i);
  const homeLink = getByText(/Home/i);
  const favoritesLink = getByText(/Favorites/i);
  const searchLabel = getByText(/Search:/i);
  
  expect(title).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(favoritesLink).toBeInTheDocument();
  expect(searchLabel).toBeInTheDocument();
});
