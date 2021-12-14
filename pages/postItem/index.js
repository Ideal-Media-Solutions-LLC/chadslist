import { useState, useContext } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ItemContext from '../../context/item/ItemContext';

const PostItem = (props) => {
  const { currentLocation, createItem } = useContext(ItemContext);

  const [form, setForm] = useState({
    itemName: '',
    category: '',
    description: '',
    images: []
  })

  const handlePost = (e) => {
    e.preventDefault();
    createItem(form)
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value})
  }

  const imageChanger = (e) => {
    let images = e.target.files[0];

    let url = URL.createObjectURL(images);

    setForm({
      ...form,
      images: url
    })
  }

  return (
    <div>
      <Container>
        <Col>
          <br></br>
          <h2>Post an Item</h2>
          <br></br>
          <Form onSubmit={handlePost}>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Images:</Form.Label>
              <Form.Control onChange={imageChanger} type='file' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control value={form.itemName} name="itemName" onChange={handleChange} type='textarea' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Category:</Form.Label>
              <Form.Select value={form.category} name="category" onChange={handleChange} aria-label="Floating label select example">
                <option>Select Item Category</option>
                <option value="Apparel">Apparel</option>
                <option value="Electronics">Electronics</option>
                <option value="Garden and Outdoor">Garden and Outdoor</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Home Goods">Home Goods</option>
                <option value="Musical Instruments">Musical Instruments</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Sporting Goods">Sporting Goods</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Item Description:</Form.Label>
              <Form.Control value={form.description} name="description" onChange={handleChange} as='textarea' rows={4} />
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button variant="primary" type="submit">
                Post
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