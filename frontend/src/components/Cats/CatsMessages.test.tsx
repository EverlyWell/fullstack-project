import { render } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import CatsMessages from "./CatsMessages";

describe('<Public/>', () => {
  it('Should renders the cats messages', async () => {
    const {getByTestId} = render(
      <TestingProviders>
        <CatsMessages
          openFavoriteMessage={true}
          handleFavoriteMessageClose={() => {}}
        />
      </TestingProviders>,
    );

    const successAlert = getByTestId('favorite-success-alert');
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toBeVisible();
    expect(successAlert).toHaveTextContent('Favorite save success!');
  });
});
