import { useState, useEffect } from 'react';
import { InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const MessageView = (props) => {

  const [message, setMessage] = useState('');
  const [convo, setConvo] = useState([]);

  // const getMessages = () => {
  //   axios.get('http://localhost:3001').then((data) => console.log('message', data.data));
  // }

  const input = (e) => setMessage(e.target.value);

  const sendMsg = (e) => {
    console.log('invoked', message);
    e.preventDefault();

    axios.post('http://localhost:3001/chat', {claimantId: 1, message: message})
    .then(() => console.log('MSG sent'))
    .catch(err => console.log(err));

    e.target.reset();
  }

  return (
    <div>
      Messages
      <Form
        style={{position:'absolute', bottom:'20px', width:'70%', left:'15%'}}
        onSubmit={sendMsg}>
        <InputGroup className="mb-3">
          <FormControl
            onChange={input}
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
  )
}

export default MessageView;