import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Container, Col, Form, Button, Image, Modal, Row, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ItemContext from '../../context/item/ItemContext';
import NaviBar from '../../components/NaviBar.js';
import Avatar from '@mui/material/Avatar';
import AuthContext from '../../context/auth/AuthContext';
import { storage } from '../../backend/db/firebase/firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const PostItem = (props) => {
  const { currentLocation, createItem, isPosted } = useContext(ItemContext);
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    description: '',
    images: []
  })

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  console.log(ref(storage), 'look')

  const handlePost = (e) => {
    e.preventDefault();
    createItem(form, openModal);

  }

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value})
  }

  const imageChanger = (e) => {
    let images = e.target.files[0];
    const imgRef = ref(storage, 'images');
    const upload = uploadBytesResumable(imgRef, images);
    upload.on('state_changed',
    (snap) => console.log('succress'),
    (err) => console.log(err),
    () => getDownloadURL(upload.snapshot.ref)
      .then((downloadURL) => {
        console.log('File available at', downloadURL);
        setForm({
          ...form,
          images: downloadURL
        })
      })
      .catch(err => console.log(err))
    )

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
      <Row className="header">
            <Col>
              <img className="home-page-logo" src='/Chads_list_2.svg' width='230' height='100' />
            </Col>
            <Col className="home-page-buttons">
              {user ? <div className="avatar-header-row" onClick={naviShow}>
                <Avatar alt="Travis Howard" src={user.photoUrl} style={{ height: '35px', width: '35px', marginRight: '8px' }}/>
                <div style={{ marginTop: '12px', fontWeight: 'bold', display: 'flex', flexWrap: 'wrap' }}>
                {/* <p>{user.userName}</p> */}
                </div>
              </div> :   <img id="hamburger-menu-home-page" onClick={naviShow} src='/dropdown_menu.svg' width='50' height='50' /> }

              <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <NaviBar close={closeNavi}/>
              </Offcanvas>
            </Col>
        </Row>
        <Col>
          <br></br>
          <h2>Post an Item</h2>
          <br></br>
          <Form onSubmit={handlePost}>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Images:</Form.Label>
              <Form.Control onChange={imageChanger} accept='image/*' type='file' required />
            </Form.Group>
            {form.images && <img style={{ height: '70px', margin: '5px' }} src={form.images} alt=''/>}
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control value={form.itemName} name="itemName" onChange={handleChange} type='textarea' required />
            </Form.Group>
           { !locationTracker() && <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Location:</Form.Label>
              <Form.Control onChange={(e) => setLocationInput(e.target.value)} type='textarea' required />
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
              <Button variant="outline-primary" type="submit">
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