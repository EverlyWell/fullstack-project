import { render } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import { ICat } from "../../typings";
import CatModal from "./CatModal";

describe('<CatModal/>', () => {
  let cat: ICat = {
    id: '1',
    breeds: [],
    url: 'http://localhost/my-image',
    height: 100,
    width: 100,
  };

  it('Should renders the cat modal', async () => {
    const {getByText, getByTestId} = render(
      <TestingProviders>
        <CatModal
          cat={cat}
        />
      </TestingProviders>,
    );

    const catModal = getByTestId('cat-modal');
    expect(catModal).toBeInTheDocument();
    expect(catModal).toBeVisible();

    expect(getByText('Breeds:')).toBeInTheDocument();
    expect(getByText('Width:')).toBeInTheDocument();
    expect(getByText('Height:')).toBeInTheDocument();

    expect(getByTestId('cat-modal-title')).toHaveTextContent(cat.id);
    expect(getByTestId('cat-modal-breeds')).toHaveTextContent(cat.breeds.join(', '));
    const catImage = getByTestId('cat-modal-image');
    expect(catImage).toBeInTheDocument();
    expect(catImage).toHaveAttribute('src', cat.url);
    expect(getByTestId('cat-modal-width')).toHaveTextContent(`${cat.width}`);
    expect(getByTestId('cat-modal-height')).toHaveTextContent(`${cat.height}`);
  });
});
