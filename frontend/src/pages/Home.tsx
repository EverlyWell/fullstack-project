import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Home: React.FC = () => {
  return (
    <Form className="mt-4">
      <Row className="justify-content-center">
        <Col xs lg="4">
          <Form.Label htmlFor="inlineFormInputName2" srOnly>
            Search Images
          </Form.Label>
          <Form.Control type="text" placeholder="Search"></Form.Control>
        </Col>
      </Row>
    </Form>
  );
}

export default Home;
