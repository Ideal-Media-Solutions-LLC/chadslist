import { useContext, useState } from 'react';
import ChatContext from '../context/chat/ChatContext';
import { InputGroup, Button, FormControl, Form, Popover, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import MessageView from './MessageView.js';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3200");

const ChatRow = ({ message, userId }) => {
  const { id, smallerId, largerId } = message;
  const { getMessages } = useContext(ChatContext);
  const [show, setShow] = useState(false);
  const receiverId = smallerId == userId ? largerId : smallerId

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
  <Row className="chat-row" onClick={() => {
    joinRoom();
    getMessages(userId, receiverId)
    setShow(!show)}}>
    <Col>
    <Image src="https://i.pinimg.com/736x/f9/e4/d9/f9e4d92f175e120ac1840a29095e3646.jpg" roundedCircle className="chat-icon" />
    </Col>
    <Col>
    <h3>Conversation No. {id}</h3>
    </Col>
  </Row>

  <Modal centered show={show} fullscreen={true} onHide={() => setShow(!show)} >
  <Modal.Header closeButton>UserName</Modal.Header>
  <MessageView sender={userId} receiver={receiverId} id={id} socket={socket}/>
  </Modal>
</>
  )
}

export default ChatRow