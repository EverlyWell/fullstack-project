import { cleanup, render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { categoriesApiUrl } from "../../api";
import TestingProviders from "../../test-utils/testing-provider";
import Filters from "./Filters";

describe('<Filters/>', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(categoriesApiUrl).reply(200, []);
  });

  afterEach(cleanup);

  it('Should renders the filters', async () => {
    const {getByText, getByTestId} = render(
      <TestingProviders>
        <Filters
          categoryId={1}
          handleCategoryChange={() => {}}
        />
      </TestingProviders>,
    );

    await waitFor(() => {
      expect(getByText('Category:')).toBeInTheDocument();
      expect(getByTestId('categories')).toBeInTheDocument();
    });
  });
});
