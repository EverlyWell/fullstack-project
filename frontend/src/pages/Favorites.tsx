import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import ImageContainer from '../components/ImageContainer';
import imageService from '../services/image';

const Favorites: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setImages([]);
      setIsLoading(true);

      const images = await imageService.get('/favorites');

      setIsLoading(false);

      setImages(images.data);
    }

    fetchData();
  }, []);

  return (
    <Row className="mt-4 justify-content-center">
      {
        isLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }

      {images.map((image: any) => (
        <ImageContainer
          key={image.source_id}
          image={image}
          showFooter={false} />
      ))}
    </Row>
  );
}

export default Favorites;
