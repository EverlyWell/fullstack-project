import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { ICat } from "../../typings";

interface ICatModalProps {
  cat: ICat;
}

const CatModal = ({cat}: ICatModalProps) => {
  const [openCatDialog, setOpenCatDialog] = useState<boolean>(false);

  const handleCloseCatDialog = () => setOpenCatDialog(false);

  useEffect(() => {
    if (cat) {
      setOpenCatDialog(true);
    }
  }, [cat]);

  return (cat ?
    (<Modal
      data-testid="cat-modal"
      show={openCatDialog}
      onHide={handleCloseCatDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title
          data-testid="cat-modal-title"
        >
          {cat.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card card-container">
          <span>
            Breeds: <span data-testid="cat-modal-breeds">{cat.breeds?.join(', ')}</span>
          </span>
          <img
            data-testid="cat-modal-image"
            src={cat.url}
            alt="..."
            className="img-thumbnail"
          ></img>
          <span>
            Width: <span data-testid="cat-modal-width">{cat.width}</span>
          </span>
          <span>
            Height: <span data-testid="cat-modal-height">{cat.height}</span>
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-testid="cat-modal-close-button"
          variant="secondary"
          onClick={handleCloseCatDialog}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>) : null
  )
}

export default CatModal;
