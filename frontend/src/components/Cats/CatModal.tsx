import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { ICat } from "../../typings/typings";

interface ICatModalProps {
  cat: ICat | undefined;
}

const CatModal = ({cat}: ICatModalProps) => {
  const [openCatDialog, setOpenCatDialog] = useState<boolean>(false);

  const handleCloseCatDialog = () => setOpenCatDialog(false);

  useEffect(() => {
    if (cat) {
      setOpenCatDialog(true);
    }
  }, [cat]);

  return (
    <Modal show={openCatDialog} onHide={handleCloseCatDialog}>
      <Modal.Header closeButton>
        <Modal.Title>{cat?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card card-container">
          <span>Breeds: {cat?.breeds}</span>
          <img src={cat?.url} alt="..." className="img-thumbnail"></img>
          <span>Width: {cat?.width}</span>
          <span>Height: {cat?.height}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCatDialog}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CatModal;
