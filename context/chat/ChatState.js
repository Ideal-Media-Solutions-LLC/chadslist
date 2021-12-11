import ChatContext from './ChatContext.js';
import ChatReducer from './ChatReducer.js';
import { useReducer } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/chat'

const ChatState = (props) => {
  const initialState = {
    messageList: []
  }

  const [state, dispatch] = useReducer(ChatReducer, initialState)

  const getMessages = (senderId, receiverId) => {
    axios.post(API_URL, {
      senderId,
      receiverId
    })
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <ChatContext.Provider value={{ messageList: state.messageList, getMessages }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState;