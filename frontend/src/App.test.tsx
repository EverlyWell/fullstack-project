import { cleanup, render } from '@testing-library/react';
import App from './App';
import TestingProviders from './test-utils/testing-provider';

describe('<App/>', () => {
  describe('home page', () => {
    beforeEach(() => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: 'email@example.com',
          accessToken: 'aaaabbbbccccddddeeeeffff'
        })
      );
    });

    afterEach(cleanup)

    it('Should renders the home page', async () => {
      const {getByText} = render(
        <TestingProviders>
          <App />
        </TestingProviders>,
      );

      expect(getByText('Cats everywhere !!')).toBeInTheDocument();
      expect(getByText('Cats')).toBeInTheDocument();
      expect(getByText('Favorites')).toBeInTheDocument();
      expect(getByText('email@example.com')).toBeInTheDocument();
      expect(getByText('Logout')).toBeInTheDocument();
    })
  })

  describe('hidden page', () => {
    beforeEach(() => {
      localStorage.removeItem('user');
    })

    afterEach(cleanup)

    it('Should renders the hidden page', async () => {
      const {getByText} = render(
        <TestingProviders>
          <App />
        </TestingProviders>,
      );

      expect(getByText('Hidden cats')).toBeInTheDocument();
      expect(getByText('Login')).toBeInTheDocument();
      expect(getByText('Sign Up')).toBeInTheDocument();
      expect(getByText('Public')).toBeInTheDocument();
    })
  })
});
