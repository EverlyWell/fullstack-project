import React from 'react';
import { render, fireEvent, mount } from '@testing-library/react';
import ImageSearch from './ImageSearch';

test('renders expected elements', () => {
  const { getByRole } = render(<ImageSearch />);

  expect(getByRole('button', {name: /submit/i})).toBeInTheDocument();
  expect(getByRole('searchbox')).toBeInTheDocument();
});


test('results are rendered', () => {
  const { getByAltText } = render(<ImageSearch items={[{ slug: 'abc123', thumbnail: 'http://test.com/abc123.gif', source: 'Giphy' }]} />);

  expect(getByAltText('Thumbnail image')).toBeInTheDocument();
});
