import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('renders submit button', () => {
    const {getByText} = render(<SearchForm />);
    const searchButtonElement = getByText(/search/i);

    expect(searchButtonElement).toBeInTheDocument();
  });

  it('calls handleSubmit on submit', () => {
    const {getByText} = render(<SearchForm />);
    const searchButtonElement = getByText(/search/i);

    fireEvent.click(searchButtonElement);
    expect(getByText(/searching/i)).toBeInTheDocument();
  });
});
