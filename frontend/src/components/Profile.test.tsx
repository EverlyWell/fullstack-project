import { cleanup, render } from "@testing-library/react";
import TestingProviders from "../test-utils/testing-provider";
import Profile from "./Profile";

describe('<Profile/>', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        email: 'email@example.com',
        accessToken: 'aaaabbbbccccddddeeeeffff'
      })
    );
  });

  afterEach(cleanup);

  it('Should renders the profile', async () => {
    const {getByText, getByTestId} = render(
      <TestingProviders>
        <Profile />
      </TestingProviders>,
    );

    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByTestId('profile-image')).toBeInTheDocument();
    expect(getByTestId('profile-email')).toBeInTheDocument();
  });
});
