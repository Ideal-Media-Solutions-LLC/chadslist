import { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostItem = (props) => {

  const [input, setInput] = useState ({
    ItemName: '',
    Category: '',
    Description: '',
    images: []
  })

  const handlePost = (e) => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <div>
      <Container>
        <Col>
          <img src="/Chads_List_2.svg" alt="chadslist_logo" width={400} />
          <br></br>
          <br></br>
          <h2>Post an Item</h2>
          <br></br>
          <Form onSubmit={handlePost}>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Images:</Form.Label>
              <Form.Control type='file' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control type='textarea' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Category:</Form.Label>
              <Form.Select aria-label="Floating label select example">
                <option>Select Item Category</option>
                <option value="1">Apparel</option>
                <option value="2">Electronics</option>
                <option value="3">Garden and Outdoor</option>
                <option value="4">Hobbies</option>
                <option value="5">Home Goods</option>
                <option value="6">Musical Instruments</option>
                <option value="7">Office Supplies</option>
                <option value="8">Pet Supplies</option>
                <option value="9">Sporting Goods</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Item Description:</Form.Label>
              <Form.Control as='textarea' rows={4} />
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button href='/'>back</Button>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </div>
  )
}

export default PostItem;