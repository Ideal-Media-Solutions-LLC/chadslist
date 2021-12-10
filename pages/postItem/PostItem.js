import { useState } from 'react';
import { Container, Col, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostItem = (props) => {

  return (
    <div>
      <Container>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Images</Form.Label>
              <Form.Control type='file' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control type='textarea' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Item Description</Form.Label>
              <Form.Control as='textarea' rows={4} />
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </div>
  )
}

export default PostItem;