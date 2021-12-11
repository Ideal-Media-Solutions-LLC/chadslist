import { Button, Card, CloseButton, Modal } from 'react-bootstrap';
import MessageView from './MessageView.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import axios from 'axios';

const ItemView = (props) => {

  const [Message, setMessage] = useState (false);
  const showMessage = () => setMessage(true);
  const closeMessage = () => setMessage(false);
  const [isClaim, setIsClaim] = useState(false)


  const handleClaimClick = () => {
    axios.post('http://localhost:3001/claim', {
      claimerId: '',
      itemId: '',
      status: '',
      UserId: '',
    })
    .then(() => console.log('claim success'))
    .catch(err => console.log('claim err', err));

    setIsClaim(!isClaim)
  }


  return (
    <>
      <Card style={{ width: '24.9rem' }}>
        <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Value</Card.Text>
          <Card.Text>Location</Card.Text>
          <Button variant={isClaim? "secondary":"primary"} onClick={handleClaimClick}>{isClaim? "Unclaim":"Claim"}</Button>
          <Button onClick={showMessage} variant="primary">Message</Button>
          <Card.Text>
            Item's Detail
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal centered show={Message} fullscreen={true} onHide={closeMessage} >
        <Modal.Header closeButton>Message</Modal.Header>
        <MessageView />
      </Modal>
    </>
  )
}

export default ItemView;
