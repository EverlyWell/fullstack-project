import { Alert } from "react-bootstrap";

interface IFavoritesMessagesProps {
  openFavoriteMessage: boolean;
  handleFavoriteMessageClose: any;
}

// TODO: add error messages
const FavoritesMessages = ({openFavoriteMessage, handleFavoriteMessageClose}: IFavoritesMessagesProps) => {
  return (
    <>
      {openFavoriteMessage &&
        <Alert
          data-testid="favorite-success-alert"
          variant="success"
          onClose={handleFavoriteMessageClose}
          dismissible
        >
          Favorite removed successfully!
        </Alert>}
    </>
  );
}

export default FavoritesMessages;
