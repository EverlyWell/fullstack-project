import { render } from "@testing-library/react";
import TestingProviders from "../../test-utils/testing-provider";
import { IFav } from "../../typings";
import FavoriteModal from "./FavoriteModal";

describe('<FavoriteModal/>', () => {
  let favorite: IFav = {
    id: '1',
    sub_id: '1',
    user_id: '1',
    image_id: '1',
    image: {
      id: '1',
      url: 'http://localhost/my-image',
    },
    created_at: '2020-01-01T00:00:00.000Z',
  };

  it('Should renders the favorite modal', async () => {
    const {getByText, getByTestId} = render(
      <TestingProviders>
        <FavoriteModal
          favorite={favorite}
        />
      </TestingProviders>,
    );

    const favoriteModal = getByTestId('fav-modal');
    expect(favoriteModal).toBeInTheDocument();
    expect(favoriteModal).toBeVisible();

    expect(getByText('Image Id:')).toBeInTheDocument();
    expect(getByText('Sub Id:')).toBeInTheDocument();
    expect(getByText('User Id:')).toBeInTheDocument();
    expect(getByText('Created at:')).toBeInTheDocument();

    expect(getByTestId('fav-modal-title')).toHaveTextContent(favorite.id);
    const favoriteImage = getByTestId('fav-modal-image');
    expect(favoriteImage).toBeInTheDocument();
    expect(favoriteImage).toHaveAttribute('src', favorite.image.url);
    expect(getByTestId('fav-modal-image-id')).toHaveTextContent(favorite.image_id);
    expect(getByTestId('fav-modal-sub-id')).toHaveTextContent(favorite.sub_id);
    expect(getByTestId('fav-modal-user-id')).toHaveTextContent(favorite.user_id);
    expect(getByTestId('fav-modal-created-at')).toHaveTextContent(favorite.created_at);
  })
});
