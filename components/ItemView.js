import { Button, Card, CloseButton, Modal } from 'react-bootstrap';
import MessageView from './MessageView.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import axios from 'axios';

const ItemView = (props) => {

  const [Message, setMessage] = useState (false);
  const showMessage = () => setMessage(true);
  const closeMessage = () => setMessage(false);


  const handleClaimClick = () => {
    const claim = () => {
      axios.post('http://localhost:3001/claim')
      .then()
      .catch();
    }
  }


  return (
    <>
      <Card style={{ width: '24.9rem' }}>
        <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Value</Card.Text>
          <Card.Text>Location</Card.Text>
          <Button variant="primary" onClick={handleClaimClick}>Claim</Button>
          <Button onClick={showMessage} variant="primary">Message</Button>
          <Card.Text>
            Item's Detail
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal centered show={Message} fullscreen={true} onHide={closeMessage} >
        <Modal.Header closeButton></Modal.Header>
        <MessageView />
      </Modal>
    </>
  )
}

export default ItemView;
