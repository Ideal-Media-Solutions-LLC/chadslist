import { useState, useEffect, useContext } from 'react';
import ChatContext from '../../context/chat/ChatContext';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';
import NaviBar from '../../components/NaviBar.js';
import MessageView from '../../components/MessageView';
import ChatRow from '../../components/ChatRow';
import AuthContext from '../../context/auth/AuthContext';
import Avatar from '@mui/material/Avatar';
import Loader from '../../components/Loader';

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const { getAllMessages, messagePageList, loading } = useContext(ChatContext);

  useEffect(() => {
    getAllMessages();
  }, []);


  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Row className="header">
          <Col>
            <img className="home-page-logo" src='/Chads_list_2.svg' width='230' height='100' />
          </Col>
          <Col className="home-page-buttons">
            {user ? <div className="avatar-header-row" onClick={naviShow}>
              <Avatar alt="Travis Howard" src={user.photoUrl} style={{ height: '35px', width: '35px', marginRight: '8px' }}/>
              <div style={{ marginTop: '12px', fontWeight: 'bold', display: 'flex', flexWrap: 'wrap' }}>
                <p>{user.userName}</p>
              </div>
            </div> : <img id="hamburger-menu-home-page" onClick={naviShow} src='/dropdown_menu.svg' width='50' height='50' /> }

            <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <NaviBar close={closeNavi}/>
            </Offcanvas>
          </Col>
        </Row>
        <Container className="chat-container"fluid="md">
          <div className="inbox">Inbox</div>
          {messagePageList.map((message) => (
            <ChatRow message={message} userId={user.id} />
          ))}
        </Container>
      </>
    );
  }
};

export default ChatPage;