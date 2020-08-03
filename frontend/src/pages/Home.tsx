import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import imageService from '../services/image';
import useDebounce from '../hooks/useDebounce';
import ImageContainer from '../components/ImageContainer';

const Home: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [query, setQuery]= useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 300);

  // Since image results are local to this page, let's just use local state vs redux store.
  useEffect(() => {
    async function fetchData() {
      if (debouncedQuery) {
        setImages([]);
        setIsSearching(true);

        const newImages = await imageService.get(`/images?q=${debouncedQuery}&page=${page}`);

        setIsSearching(false);

        setImages(images => [...images, ...newImages.data]);
      } else {
        setImages([]);
      }
    }

    fetchData();
  }, [debouncedQuery, page]);

  const onToggleFavorite = async (image: any) => {
    let newId: null | number = null;
    try {
      if (!image.favorite) {
        const resp = await imageService.post('/favorites', {
          source_id: image.source_id,
          url: image.url
        });

        newId = resp.data.id;
      } else {
        await imageService.delete(`/favorites/${image.id}`);
      }

      const mutatedImages = images.map((i: any) => {
        if (i.source_id === image.source_id) {
          return {
            ...i,
            id: newId,
            favorite: !i.favorite
          }
        }

        return i;
      });

      setImages(mutatedImages);
    } catch (e) {

    }
  }

  return (
    <>
      <Row className="justify-content-center mt-4">
        <Col xs lg="4">
          <FormLabel htmlFor="inlineFormInputName2" srOnly>
            Search Images
          </FormLabel>
          <FormControl
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            type="text"
            placeholder="Search Images">
          </FormControl>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        {
          isSearching &&
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        {images.map((image: any) => (
          <ImageContainer
            key={image.source_id}
            image={image}
            onToggleFavorite={onToggleFavorite} />
        ))}
      </Row>
    </>
  );
}

export default Home;
