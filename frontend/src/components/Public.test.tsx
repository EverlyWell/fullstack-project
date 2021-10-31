import { render } from "@testing-library/react";
import TestingProviders from "../test-utils/testing-provider";
import Public from "./Public";

describe('<Public/>', () => {
  it('Should renders public', async () => {
    const {getByText} = render(
      <TestingProviders>
        <Public />
      </TestingProviders>,
    );

    expect(getByText('Public')).toBeInTheDocument();
  });
});
