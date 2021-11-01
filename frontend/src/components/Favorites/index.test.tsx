import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import FavoritesList from ".";
import { categoriesApiUrl, favoritesApiUrl } from "../../api";
import TestingProviders from "../../test-utils/testing-provider";

describe('<FavoritesList/>', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(new RegExp(favoritesApiUrl)).reply(200, {favs: [], pagination: { count: 5, page: 1, limit: 5}});
    mock.onGet(categoriesApiUrl).reply(200, []);
  });

  it('Should renders the favorites list', async () => {
    const {getByText} = render(
      <TestingProviders>
        <FavoritesList />
      </TestingProviders>,
    );

    await waitFor(() => {
      expect(getByText('Favorites')).toBeInTheDocument();
    });
  });
});
