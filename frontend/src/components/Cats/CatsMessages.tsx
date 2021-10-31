import { Alert } from "react-bootstrap";

interface ICatsMessagesProps {
  openFavoriteMessage: boolean;
  handleFavoriteMessageClose: any;
}

// TODO: add error messages
const CatsMessages = ({openFavoriteMessage, handleFavoriteMessageClose}: ICatsMessagesProps) => {
  return (
    <>
      {openFavoriteMessage &&
        <Alert
          data-testid="favorite-success-alert"
          variant="success"
          onClose={handleFavoriteMessageClose}
          dismissible
        >
          Favorite save success!
        </Alert>}
    </>
  );
}

export default CatsMessages;
