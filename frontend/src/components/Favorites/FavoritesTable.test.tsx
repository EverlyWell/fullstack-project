import { render, screen } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import { IFav } from "../../typings";
import FavoritesTable from "./FavoritesTable";

describe('<FavoritesTable/>', () => {
  const favorites: IFav[] = [
    {
      id: '1',
      sub_id: '1',
      user_id: '1',
      image_id: '1',
      image: {
        id: '1',
        url: 'http://localhost/my-image',
      },
      created_at: '2020-01-01T00:00:00.000Z',
    }
  ];

  it('Should renders the favorites table', async () => {
    const { getByTestId } = render(
      <TestingProviders>
        <FavoritesTable
          favorites={favorites}
          handleOpenFavoriteDialog={() => {}}
          handleRemoveFavorite={() => {}}
        />
      </TestingProviders>,
    );

    const favoritessTable = getByTestId('favs-table');
    expect(favoritessTable).toBeInTheDocument();

    let columnHeaders = await screen.findAllByRole('columnheader');
    let headers = columnHeaders.map(header => header.textContent);
    expect(headers).toEqual(expect.arrayContaining(['Id', 'Image Id', 'Image', 'Sub Id', 'User Id', 'Actions']));

    const favorite = favorites[0];
    const cells = await screen.findAllByRole('cell');
    expect(cells[0].textContent).toEqual(favorite.id);
    expect(cells[1].textContent).toEqual(favorite.image_id);
    expect(cells[2].firstChild).toHaveAttribute('src', favorite.image.url);
    expect(cells[3].textContent).toEqual(favorite.sub_id);
    expect(cells[4].textContent).toEqual(favorite.user_id);
    // TODO: add actions
  })
});
