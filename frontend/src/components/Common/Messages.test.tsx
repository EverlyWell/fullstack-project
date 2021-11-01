import { render } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import Messages from "./Messages";

describe('<Messages/>', () => {
  let message = 'message success!';
  let variant = 'success';

  it('Should renders the messages', async () => {
    const {getByTestId} = render(
      <TestingProviders>
        <Messages
          message={message}
          variant={variant}
          openMessage={true}
          handleMessageClose={() => {}}
        />
      </TestingProviders>,
    );

    const successAlert = getByTestId('message-alert');
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toBeVisible();
    expect(successAlert).toHaveTextContent(message);
    expect(successAlert).toHaveClass(`alert-${variant}`);
    expect(successAlert).toHaveAttribute('role', 'alert');
  });
});
