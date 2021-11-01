import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IFav } from "../../typings";

interface IFavoriteModalProps {
  favorite: IFav;
}

const FavoriteModal = ({favorite}: IFavoriteModalProps) => {
  const [openFavoriteDialog, setOpenFavoriteDialog] = useState<boolean>(false);

  const handleCloseFavoriteDialog = () => setOpenFavoriteDialog(false);

  useEffect(() => {
    if (favorite) {
      setOpenFavoriteDialog(true);
    }
  }, [favorite]);

  return (favorite ?
    (<Modal
      data-testid="fav-modal"
      show={openFavoriteDialog}
      onHide={handleCloseFavoriteDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title
          data-testid="fav-modal-title"
        >
          {favorite.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card card-container">
          <img
            data-testid="fav-modal-image"
            src={favorite.image?.url}
            alt="..."
            className="img-thumbnail"
          ></img>
          <span>
            Image Id: <span data-testid="fav-modal-image-id">{favorite.image_id}</span>
          </span>
          <span>
            Sub Id: <span data-testid="fav-modal-sub-id">{favorite.sub_id}</span>
          </span>
          <span>
            User Id: <span data-testid="fav-modal-user-id">{favorite.user_id}</span>
          </span>
          <span>
            Created at: <span data-testid="fav-modal-created-at">{favorite.created_at}</span>
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-testid="fav-modal-close-button"
          variant="secondary"
          onClick={handleCloseFavoriteDialog}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>) : null
  )
}

export default FavoriteModal;
