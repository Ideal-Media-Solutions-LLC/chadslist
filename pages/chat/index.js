import { useState, useEffect, useContext } from 'react'
import ChatContext from '../../context/chat/ChatContext'

const ChatPage = () => {
  const { getAllMessages } = useContext(ChatContext);


  useEffect(() => {
    getAllMessages();
  }, [])

  return (
    <h1>Chat Page</h1>
  )
}

export default ChatPage;