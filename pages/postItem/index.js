import { useState, useContext } from 'react';
import Link from 'next/link';
import { Container, Col, Form, Button, Image, Modal } from 'react-bootstrap';
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

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handlePost = async (e) => {
    e.preventDefault();
    await createItem(form);
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

  const locationTracker = () => {
    if (currentLocation.lat && currentLocation.lng) {
      return true;
    } else {
      return false
    }

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
              <Form.Control onChange={imageChanger} type='file' required />
            </Form.Group>
            {form.images && <img style={{ height: '70px', margin: '5px' }} src={form.images} alt=''/>}
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control value={form.itemName} name="itemName" onChange={handleChange} type='textarea' required />
            </Form.Group>
           { !locationTracker() && <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Location:</Form.Label>
              <Form.Control value={form.itemName} name="itemName" onChange={handleChange} type='textarea' required />
            </Form.Group>}
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Category:</Form.Label>
              <Form.Select value={form.category} name="category" onChange={handleChange} aria-label="Floating label select example" required>
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
              <Form.Control value={form.description} name="description" onChange={handleChange} as='textarea' rows={4} required />
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button onClick={openModal} variant="outline-primary" type="submit">
                Post
              </Button>
              <Button variant="outline-primary"><Link href='/'><a>back</a></Link></Button>
            </Form.Group>
          </Form>
        </Col>
      </Container>

      <Modal centered show={show} size='md' onhide={closeModal}>
        <Modal.Body>Your item has successfully posted</Modal.Body>
        <Button variant="outline-primary"><Link href='/'><a>OK</a></Link></Button>
        </Modal>
    </div>
  )
}

export default PostItem;