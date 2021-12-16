import ChatContext from './ChatContext.js';
import ChatReducer from './ChatReducer.js';
import { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../auth/AuthContext.js';

import {
  GET_MESSAGES,
  UPDATE_MESSAGES,
  SET_MESSAGE_PAGE_LIST,
  CLEAR_SAVED_MESSAGES,
  SET_LOADING,
  ADD_MESSAGE
} from '../types.js';

const API_URL = 'http://localhost:3001/chat'

const ChatState = (props) => {
  const initialState = {
    savedMessages: [],
    conversationId: null,
    messagePageList: [],
    loading: false
  }

  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(ChatReducer, initialState)

  const getMessages = (senderId, receiverId, id) => {
    axios.post(API_URL, {
      senderId,
      receiverId,
      id
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

  const getAllMessages = () => {
    axios.get(`${API_URL}/message/${user.id}`)
    .then((result) => {
      console.log(result.data)
      dispatch({
        type: SET_MESSAGE_PAGE_LIST,
        payload: result.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const clearSavedMessages = () => {

    dispatch({
      type: CLEAR_SAVED_MESSAGES,
      payload: null
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: message
    })
  }
  const setLoading = () => {
    // console.log('test')
    dispatch({
      type: SET_LOADING,
    })
  }

  return (
    <ChatContext.Provider value={{ savedMessages: state.savedMessages, conversationId: state.conversationId, messagePageList: state.messagePageList, getMessages, createMessage, getAllMessages, clearSavedMessages, setLoading, addMessage }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState;