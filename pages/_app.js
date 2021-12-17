import AuthState from '../context/auth/AuthState';
import ChatState from '../context/chat/ChatState';
import ItemState from '../context/item/ItemState';
import { useState } from 'react';
import { Button, Offcanvas, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/signup.css';
import '../styles/mapView.css'
import '../styles/Chat.css'
import '../styles/history.css';
import '../styles/Header.css';
import '../styles/homePage.css';
import '../styles/Navbar.css';
import '../styles/Item.css';

function MyApp({ Component, pageProps }) {

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  return (
    <AuthState>
      <ItemState>
      <ChatState>
      <Component {...pageProps} />
      </ChatState>
      </ItemState>
    </AuthState>
  )
}

export default MyApp
