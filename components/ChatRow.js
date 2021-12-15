import { useContext, useState } from 'react';
import ChatContext from '../context/chat/ChatContext';
import { InputGroup, Button, FormControl, Form, Popover, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import MessageView from './MessageView.js';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3200");

const ChatRow = ({ message, userId }) => {
  const { id, smallerId, largerId } = message;
  const { getMessages, messagePageList } = useContext(ChatContext);
  const [show, setShow] = useState(false);
  const receiverId = smallerId == userId ? largerId : smallerId
  
  const { user : { userName, email, photoUrl } } = message;
  const data = {
    socket: socket,
    sender: userId,
    receiver: receiverId,
    id: id
  }

  const joinRoom = () => {
    socket.emit("join_chat", id)
  }

  return (
    <>
  <Row className="chat-row-container" onClick={() => {
    joinRoom();
    getMessages(userId, receiverId)
    setShow(!show)}}>
    <div className="chat-row">
      <Image src={photoUrl} roundedCircle className="chat-icon" />
      <div className="chat-row-text">
        <div>{userName}</div>
      </div>
    </div>
  </Row>

  <Modal centered show={show} fullscreen={true} onHide={() => setShow(!show)} >
  <Modal.Header closeButton>UserName</Modal.Header>
  <MessageView sender={userId} receiver={receiverId} id={id} socket={socket}/>
  </Modal>
</>
  )
}

export default ChatRow