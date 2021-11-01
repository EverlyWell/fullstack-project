import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CatList from ".";
import { categoriesApiUrl, catsApiUrl } from "../../api";
import TestingProviders from "../../test-utils/testing-provider";

describe('<CatList/>', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(new RegExp(catsApiUrl)).reply(200, {cats: [], pagination: { count: 5, page: 1, limit: 5}});
    mock.onGet(categoriesApiUrl).reply(200, []);
  });

  it('Should renders the cats list', async () => {
    const {getByText} = render(
      <TestingProviders>
        <CatList />
      </TestingProviders>,
    );

    await waitFor(() => {
      expect(getByText('Cats')).toBeInTheDocument();
    });
  });
});
