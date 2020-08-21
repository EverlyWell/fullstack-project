import React from 'react';
import {render} from '@testing-library/react';
import ImageGrid from './ImageGrid';

describe('ImageGrid', () => {
  it('renders if no images', () => {
    const {getByText} = render(<ImageGrid images={[]} />);
    const messageElement = getByText(/FUN/i);

    expect(messageElement).toBeInTheDocument();
  });

});
