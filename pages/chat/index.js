import { useState, useEffect, useContext } from 'react'
import ChatContext from '../../context/chat/ChatContext'
import { Container, Row, Col } from 'react-bootstrap';
import MessageView from '../../components/MessageView';
import ChatRow from '../../components/ChatRow';
import AuthContext from '../../context/auth/AuthContext';

const ChatPage = () => {
  const { user } = useContext(AuthContext)
  const { getAllMessages, messagePageList } = useContext(ChatContext);

  useEffect(() => {
    getAllMessages();
    console.log(messagePageList)
  }, [])


  if (messagePageList.length === 0) {
    return <p>...Loading</p>
  } else {
    return (
      <Container fluid="md">
        {messagePageList.map((message) => (
          <ChatRow message={message} userId={user.id} />
        ))}
      </Container>
    )
  }
}

export default ChatPage;