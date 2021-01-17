import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Favorites from './components/Favorites';

test('renders Favorites component', () => {
  render(
    <Favorites />
  )
});
