import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 
import Search from '../components/Search';
 
describe('Search', () => {
  test('renders Search component', () => {
    render(<Search />);
 
    expect(screen.getByText('Search for a Gif')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});