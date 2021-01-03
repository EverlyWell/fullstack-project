import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders application', () => {
  const { getByText } = render(<App />);

  const title = getByText(/Gif Image Search App/i);
  const homeLink = getByText(/Home/i);
  const favoritesLink = getByText(/Favorites/i);
  const loginLink = getByText(/Login/i);
  const registerLink = getByText(/Register/i);
  const searchLabel = getByText(/Search:/i);
  
  expect(title).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(favoritesLink).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
  expect(searchLabel).toBeInTheDocument();
});
