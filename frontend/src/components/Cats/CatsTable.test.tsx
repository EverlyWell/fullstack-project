import { render, screen } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import { ICat } from "../../typings";
import CatsTable from "./CatsTable";

describe('<CatsTable/>', () => {
  const cats: ICat[] = [
    {
      id: '1',
      breeds: [],
      url: 'http://localhost/my-image',
      height: 100,
      width: 100,
    }
  ];

  it('Should renders the cats table', async () => {
    const { getByTestId } = render(
      <TestingProviders>
        <CatsTable
          cats={cats}
          handleOpenCatDialog={() => {}}
          handleAddFavorite={() => {}}
        />
      </TestingProviders>,
    );

    const catsTable = getByTestId('cats-table');
    expect(catsTable).toBeInTheDocument();

    let columnHeaders = await screen.findAllByRole('columnheader');
    let headers = columnHeaders.map(header => header.textContent);
    expect(headers).toEqual(expect.arrayContaining(['Image', 'Breeds', 'Height', 'Width', 'Actions']));

    const cat = cats[0];
    const cells = await screen.findAllByRole('cell');
    expect(cells[0].textContent).toEqual(cat.id);
    expect(cells[1].textContent).toEqual(cat.breeds.join(', '));
    expect(cells[2].firstChild).toHaveAttribute('src', cat.url);
    expect(cells[3].textContent).toEqual(`${cat.height}`);
    expect(cells[4].textContent).toEqual(`${cat.width}`);
    // TODO: add actions
  });
});
