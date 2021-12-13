import { useState, useEffect, useContext } from 'react';
import { InputGroup, Button, FormControl, Form, Popover, Row } from 'react-bootstrap';
import axios from 'axios';
import ChatContext from '../context/chat/ChatContext';

import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

const API_URL = 'http://localhost:3001/chat'

const MessageView = ({socket, user1, user2, id }) => {
  const { savedMessages, createMessage } = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [savedMessages, setSavedMessages] = useState([]);

  const getMessages = () => {
    socket.on('receive_msg', data => {
      setMessageList([...messageList, data])
    })
  }

  useEffect(getMessages, [socket]);

  const sender = 11;
  const receiver = 38;

  const sendMsg = async (e) => {
    console.log('invoked', message);
    e.preventDefault();
    if (message !== '') {
      const messageData = {
        fakeConvoId: id,
        username: user1.username,
        message: message,
      }

      await socket.emit("send_msg", messageData)

      createMessage(sender, receiver, message)
      setMessageList([...messageList, messageData])

      //clear out the input box
      setMessage('');
    }

    // axios.post('http://localhost:3001/chat', {claimantId: 1, message: message})
    // .then(() => console.log('MSG sent'))
    // .catch(err => console.log(err));
  }

  return (
    <div>
      <div>
        {savedMessages.map((msg) => msg.userId === sender ? <ChatMsg side={'right'} messages={[msg.message]}/> : <ChatMsg messages={[msg.message]}/>)}
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
  )
}

export default MessageView;