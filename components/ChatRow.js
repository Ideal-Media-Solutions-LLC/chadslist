import { useContext, useState, useEffect } from 'react';
import ChatContext from '../context/chat/ChatContext';
import { InputGroup, Button, FormControl, Form, Popover, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import MessageView from './MessageView.js';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3200');
// import Avatar from '@mui/material/Avatar';
import Badge from './Badge.js';
import moment from 'moment';

const ChatRow = ({ message, userId }) => {
  const { id, smallerId, largerId, item, updatedAt } = message;
  const { getMessages, messagePageList, clearSavedMessages, setLoading } = useContext(ChatContext);
  const [show, setShow] = useState(false);
  const receiverId = smallerId == userId ? largerId : smallerId;

  const { user } = message;
  // const { user : { userName, email, photoUrl } } = message;
  const data = {
    socket: socket,
    sender: userId,
    receiver: receiverId,
    id: id
  };

  const handleHide = () => {
    setShow(!show);
    clearSavedMessages();
  };


  const joinRoom = () => {
    socket.emit('join_chat', id);
  };

  if (!user) {
    return null;
  } else {
    return (
      <>
        <Row className="chat-row-container" onClick={() => {
          joinRoom();
          // setLoading()
          getMessages(userId, receiverId);
          setShow(!show);
        }}>
          <div className="chat-row">
            {item && item.imageUrl ? <Badge userPhoto={user.photoUrl} itemPhoto={item.imageUrl}/> : <Badge userPhoto={user.photoUrl} />}
            {/* <Image src={photoUrl} roundedCircle className="chat-icon" /> */}
            <div className="chat-row-text">
              <p className="chat-username">{user.userName}</p>
              <p className="chat-item-description">{item ? item.name : null }</p>
            </div>
            <div className="chat-time">{moment(updatedAt).fromNow()}</div>
          </div>
        </Row>

        <Modal centered show={show} fullscreen={true} onHide={handleHide} >
          <Modal.Header closeButton>Chat</Modal.Header>
          <MessageView photoUrl={user.photoUrl} sender={userId} receiver={receiverId} id={id} socket={socket}/>
        </Modal>
      </>
    );
  }
};

export default ChatRow;