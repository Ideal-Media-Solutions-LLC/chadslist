import { useContext, useState, useEffect } from 'react';
import ChatContext from '../context/chat/ChatContext';
import { InputGroup, Button, FormControl, Form, Popover, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import MessageView from './MessageView.js';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3200");
import Avatar from '@mui/material/Avatar';


const ChatRow = ({ message, userId }) => {
  const { id, smallerId, largerId } = message;
  const { getMessages, messagePageList } = useContext(ChatContext);
  const [show, setShow] = useState(false);
  const receiverId = smallerId == userId ? largerId : smallerId

  const { user } = message;
  // const { user : { userName, email, photoUrl } } = message;
  const data = {
    socket: socket,
    sender: userId,
    receiver: receiverId,
    id: id
  }

  console.log(user)

  const joinRoom = () => {
    socket.emit("join_chat", id)
  }

  if(!user) {
    return null
  } else {
  return (
    <>
  <Row className="chat-row-container" onClick={() => {
    joinRoom();
    getMessages(userId, receiverId)
    setShow(!show)}}>
    <div className="chat-row">
      <Avatar style={{ height: '50px', width: '50px' }} src={user.photoUrl} alt={user.userName.slice(0, 1).toUpperCase()} />
      {/* <Image src={photoUrl} roundedCircle className="chat-icon" /> */}
      <div className="chat-row-text">
        <p className="chat-username">{user.userName}</p>
        <p>Item Name</p>
      </div>
    </div>
  </Row>

  <Modal centered show={show} fullscreen={true} onHide={() => setShow(!show)} >
  <Modal.Header closeButton>Chat</Modal.Header>
  <MessageView photoUrl={user.photoUrl} sender={userId} receiver={receiverId} id={id} socket={socket}/>
  </Modal>
</>
  )
  }
}

export default ChatRow