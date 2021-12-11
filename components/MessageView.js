import { useState, useEffect, useContext } from 'react';
import { InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import ChatContext from '../context/chat/ChatContext';

const API_URL = 'http://localhost:3001/chat'

const MessageView = ({socket, user1, user2, id }) => {
  const { savedMessages, createMessage } = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [savedMessages, setSavedMessages] = useState([]);

  console.log(savedMessages);
  // useEffect(() => {
  //   axios.post(API_URL, {
  //     senderId: user1,
  //     receiverId: user2
  //   })
  //   .then((result) => {
  //     console.log('test')
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [])

  // const getMessages = () => {
  //   socket.on('receive_msg', data => {
  //     setSavedMessages([...messageList, data])
  //   })
  // }

  // useEffect(() => {getMessages},[socket]);

  const input = (e) => setMessage(e.target.value);

  const sendMsg = async (e) => {
    console.log('invoked', message);
    e.preventDefault();
    if(message !== ''){
      const messageData ={
        fakeConvoId: id,
        username: user1,
        message: message,
        // time: new Date(Date.now()).getHour() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_msg", messageData)

      createMessage(11, 38, message)
      setMessageList([...messageList, messageData])


      //clear out the input box
      // setMessage("")
    }

    // axios.post('http://localhost:3001/chat', {claimantId: 1, message: message})
    // .then(() => console.log('MSG sent'))
    // .catch(err => console.log(err));

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