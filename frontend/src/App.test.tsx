import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {MemoryRouter} from 'react-router-dom';

test('renders routes correct', async () => {
  const app = render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <App/>
      </MemoryRouter>
  );
  expect(app.getByText(/home/i)).toBeInTheDocument();
  expect(app.getByText(/login/i)).toBeInTheDocument();
  expect(app.getByText(/signup/i)).toBeInTheDocument();
});