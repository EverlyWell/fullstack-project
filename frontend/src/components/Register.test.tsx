import { render } from "@testing-library/react";
import TestingProviders from "../test-utils/testing-provider";
import Register from "./Register";

describe('<Public/>', () => {
  it('Should renders the register', async () => {
    const {getByText, getByTestId} = render(
      <TestingProviders>
        <Register
          history={{}}
        />
      </TestingProviders>,
    );

    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText('Password Confirmation')).toBeInTheDocument();
    expect(getByText('I have read and agree to the Terms')).toBeInTheDocument();
    expect(getByTestId('register-image')).toBeInTheDocument();
    expect(getByTestId('register-email')).toBeInTheDocument();
    expect(getByTestId('register-password')).toBeInTheDocument();
    expect(getByTestId('register-password-confirmation')).toBeInTheDocument();
    expect(getByTestId('register-submit')).toBeInTheDocument();
    expect(getByTestId('register-reset')).toBeInTheDocument();
  });
});
