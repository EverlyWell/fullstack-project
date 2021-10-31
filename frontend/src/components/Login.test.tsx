import { render } from "@testing-library/react";
import TestingProviders from "../test-utils/testing-provider";
import Login from "./Login";

describe('<Public/>', () => {
  it('Should renders the Login', async () => {
    const {getByText, getByTestId} = render(
      <TestingProviders>
        <Login
          history={{}}
        />
      </TestingProviders>,
    );

    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByTestId('login-image')).toBeInTheDocument();
    expect(getByTestId('login-email')).toBeInTheDocument();
    expect(getByTestId('login-password')).toBeInTheDocument();
    expect(getByTestId('login-submit')).toBeInTheDocument();
    expect(getByTestId('login-reset')).toBeInTheDocument();
  });
});
