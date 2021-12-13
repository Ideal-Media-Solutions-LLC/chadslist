import ChatContext from './ChatContext.js';
import ChatReducer from './ChatReducer.js';
import { useReducer } from 'react';
import axios from 'axios';

import {
  GET_MESSAGES,
  UPDATE_MESSAGES
} from '../types.js';

const API_URL = 'http://localhost:3001/chat'

const ChatState = (props) => {
  const initialState = {
    savedMessages: []
  }

  const [state, dispatch] = useReducer(ChatReducer, initialState)

  const getMessages = (senderId, receiverId) => {
    axios.post(API_URL, {
      senderId,
      receiverId
    })
    .then((result) => {

      dispatch({
        type: GET_MESSAGES,
        payload: result.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const createMessage = (senderId, receiverId, message) => {
    axios.post(`${API_URL}/message`, {
      message,
      senderId,
      receiverId
    })
    .then((result) => {

      dispatch({
        type: UPDATE_MESSAGES,
        payload: result.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <ChatContext.Provider value={{ savedMessages: state.savedMessages, getMessages, createMessage }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState;