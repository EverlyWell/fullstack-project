import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('renders the navigation links', () => {
  const { getByText } = render(<App />);
  
  const searchTab = getByText("Search");
  const favTab = getByText("Favorites");
  
  expect(searchTab).toBeInTheDocument();
  expect(favTab).toBeInTheDocument();
});
