import { Button, Card, CloseButton, Modal } from 'react-bootstrap';
import MessageView from './MessageView.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useContext } from 'react';
import axios from 'axios';
import ChatContext from '../context/chat/ChatContext';
import AuthContext from '../context/auth/AuthContext';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3200");

const ItemView = ({ data }) => {
  const { name, imageUrl, category, description, status, donorId } = data;
  const { getMessages, conversationId } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
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

    const joinRoom = () => {
      // if(!conversationId) {
      //   conversationId = 0
      // }

      socket.emit("join_chat", conversationId)
    }


  return (
    <>
      <Card style={{ width: '24.9rem' }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Value</Card.Text>
          <Card.Text>Location</Card.Text>
          <Button variant={isClaim? "secondary":"primary"} onClick={handleClaimClick}>{isClaim? "Unclaim":"Claim"}</Button>
          <Button onClick={() => {
            showMessage();
            joinRoom();
            getMessages(user.id, donorId);
            }} variant="primary">Message</Button>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal centered show={Message} fullscreen={true} onHide={closeMessage} >
        <Modal.Header closeButton>UserName</Modal.Header>
        {!user ? null : <MessageView sender={user.id} receiver={donorId} id={conversationId} socket={socket}/> }
      </Modal>
    </>
  )
}

export default ItemView;
