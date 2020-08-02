import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FiHeart } from 'react-icons/fi';

const ImageContainer = ({ image }: any) => {
  const toggleFavorite = () => {
    console.log('toggle');
  }

  return (
    <Col xs={12} sm={6} md={4} className="justify-content-center align-self-center text-center p-2">
      <Card>
        <Card.Img variant="top" src={image.images.fixed_height.url} />
        <Card.Footer className="text-left">
          <Button variant="link" onClick={toggleFavorite}>
            <FiHeart />
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ImageContainer;
