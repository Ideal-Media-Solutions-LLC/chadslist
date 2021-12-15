import { useState, useEffect, useContext } from 'react'
import ChatContext from '../../context/chat/ChatContext'
import { Container, Row, Col } from 'react-bootstrap';
import MessageView from '../../components/MessageView';
import ChatRow from '../../components/ChatRow';
import AuthContext from '../../context/auth/AuthContext';

const ChatPage = () => {
  const { user } = useContext(AuthContext)
  const { getAllMessages, messagePageList, loading } = useContext(ChatContext);

  useEffect(() => {
    getAllMessages();
  }, [])


  if (loading) {
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