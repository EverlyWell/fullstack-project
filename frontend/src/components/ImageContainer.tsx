import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ImageContainer = ({ image, onToggleFavorite, showFooter = true }: any) => {
  const toggleFavorite = () => {
    onToggleFavorite(image);
  }

  return (
    <Col xs={12} sm={6} md={4} className="justify-content-center align-self-center text-center p-2">
      <Card>
        <Card.Img variant="top" src={image.url} />
        {showFooter && <Card.Footer className="text-left">
          <Button variant="link" onClick={toggleFavorite}>
            {image.favorite && <FaHeart />}
            {!image.favorite && <FiHeart />}
          </Button>
        </Card.Footer>}
      </Card>
    </Col>
  );
};

export default ImageContainer;
