import { useState, useEffect, useContext, useRef } from 'react';
import { InputGroup, Button, FormControl, Form, Popover, Row } from 'react-bootstrap';
import axios from 'axios';
import ChatContext from '../context/chat/ChatContext';
import Loader from './Loader.js';
// import AuthContext from '../context/auth/AuthContext';

import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

const API_URL = 'http://localhost:3001/chat';

const MessageView = ({socket, sender, receiver, id, photoUrl }) => {
  const { loading, savedMessages, createMessage, addMessage, setLoading } = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState(null);
  const messageEl = useRef(null);
  const getMessages = () => {
    socket.on('receive_msg', data => {
      setMessageList((messageList) => [...messageList, data]);
      // addMessage(data)
    });
  };

  useEffect(() => {
    getMessages();
  }, [socket]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', e => {
        const { currentTarget: target } = e;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth'});
      });
    }
  }, []);
  // useEffect(() => {
  //   // if(savedMessages) {
  //   // setMessageList(savedMessages);
  //   // }
  //   // if(savedMessages) {
  //   // setMessageList(savedMessages)
  //   // }
  //   // setLoading()
  // },[id])

  useEffect(() => {
    if (savedMessages) {
      setMessageList(savedMessages);
    }
  }, [savedMessages]);

  const sendMsg = async (e) => {

    e.preventDefault();
    if (message !== '') {
      const messageData = {
        id,
        userId: sender,
        message: message,
      };

      await socket.emit('send_msg', messageData);

      createMessage(sender, receiver, message);
      setMessageList((messageList) => [...messageList, messageData]);
      // addMessage(messageData)
      setMessage('');
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div ref={messageEl} className="chat-box">
          {messageList && messageList.map((msg) => msg.userId === sender ? <ChatMsg side={'right'} messages={[msg.message]}/> : <ChatMsg avatar={photoUrl} messages={[msg.message]}/>)}
        </div>

        {/* input bar */}
        <div>
          <Form
            style={{ position: 'absolute', bottom: '20px', width: '70%', left: '15%' }}
            onSubmit={sendMsg}>
            <InputGroup className="mb-3">
              <FormControl
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Messages"
                aria-label="Messages"
                aria-describedby="basic-addon2"
              />
              <Button type='submit' variant="outline-secondary" id="button-addon2">
              send
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    );
  }
};

export default MessageView;