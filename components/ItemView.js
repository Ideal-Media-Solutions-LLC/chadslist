import { Button, Card, CloseButton, Modal } from 'react-bootstrap';
import MessageView from './MessageView.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useContext } from 'react';
import axios from 'axios';
import ChatContext from '../context/chat/ChatContext';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3200");

const ItemView = (props) => {
  const { getMessages } = useContext(ChatContext);
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

    const fakeUser1 = {
      username: 'fakeUser1',
    }

    const fakeUser2 = {
      username: 'fakeUser2',
    }

    const fakeConvoId = 99;



    const joinRoom = () => {
      socket.emit("join_chat", fakeConvoId)
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
          <Button onClick={() => {
            showMessage();
            joinRoom();
            getMessages(11, 38);
            }} variant="primary">Message</Button>
          <Card.Text>
            Item's Detail
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal centered show={Message} fullscreen={true} onHide={closeMessage} >
        <Modal.Header closeButton>Message</Modal.Header>
        <MessageView user1={fakeUser1} user2={fakeUser2} id={fakeConvoId} socket={socket}/>
      </Modal>
    </>
  )
}

export default ItemView;
