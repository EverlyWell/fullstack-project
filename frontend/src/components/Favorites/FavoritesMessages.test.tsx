import { render } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import FavoritesMessages from "./FavoritesMessages";

describe('<FavoritesMessages/>', () => {
  it('Should renders the favorites messages', async () => {
    const {getByTestId} = render(
      <TestingProviders>
        <FavoritesMessages
          openFavoriteMessage={true}
          handleFavoriteMessageClose={() => {}}
        />
      </TestingProviders>,
    );

    const successAlert = getByTestId('favorite-success-alert');
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toBeVisible();
    expect(successAlert).toHaveTextContent('Favorite removed successfully!');
  });
});
