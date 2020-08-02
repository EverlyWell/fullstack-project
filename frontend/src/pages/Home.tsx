import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import imageService from '../services/image';
import useDebounce from '../hooks/useDebounce';

const Home: React.FC = () => {
  const [images, setImages] = useState({ data: [] });
  const [query, setQuery]= useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // Since image results are local to this page, let's just use local state vs redux store.
  useEffect(() => {
    async function fetchData() {
      if (debouncedQuery) {
        setImages({ data: [] });
        setIsSearching(true);

        const images = await imageService.get(`/images?q=${debouncedQuery}`);

        setIsSearching(false);

        setImages(images.data);
      } else {
        setImages({ data: [] });
      }
    }

    fetchData();
  }, [debouncedQuery]);

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

        {images.data.map((image: any) => (
          <Col xs={12} sm={6} md={4} className="justify-content-center align-self-center text-center p-2">
            <img key={image.id} src={image.images.fixed_height.url} alt='' />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Home;
