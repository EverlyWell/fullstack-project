import { render } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import Controls from "./Controls";

describe('<Controls/>', () => {
  it('Should renders the controls', async () => {
    const {getByText, getByTestId} = render(
      <TestingProviders>
        <Controls
          limit={10}
          order={'Asc'}
          page={1}
          count={10}
          handleLimitChange={() => {}}
          handleOrderChange={() => {}}
          handlePageChange={() => {}}
        />
      </TestingProviders>,
    );

    expect(getByText('Items per page:')).toBeInTheDocument();
    expect(getByText('Order:')).toBeInTheDocument();
    expect(getByTestId('limit')).toBeInTheDocument();
    expect(getByTestId('order')).toBeInTheDocument();
    expect(getByTestId('pagination')).toBeInTheDocument();
  });
});
