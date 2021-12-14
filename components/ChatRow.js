import { useContext, useState } from 'react';
// import AuthContext from '../../context/auth/AuthContext';
import { InputGroup, Button, FormControl, Form, Popover, Container, Row, Col, Modal } from 'react-bootstrap';
import MessageView from './MessageView.js';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3200");


const ChatRow = ({ message, userId }) => {
  const { id, smallerId, largerId } = message;
  const [show, setShow] = useState(false);
  const receiverId = smallerId == userId ? largerId : smallerId

  const data = {
    socket: socket,
    sender: userId,
    receiver: receiverId,
    id: id
  }

  return (
    <>
  <Row onClick={() => setShow(!show)}>
    <Col>1 of 1</Col>
  </Row>
  <Modal centered show={show} fullscreen={true} onHide={() => setShow(!show)} >
  <MessageView sender={userId} receiver={receiverId} id={id} socket={socket}/>
  </Modal>
</>
  )
}

export default ChatRow