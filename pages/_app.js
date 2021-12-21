import AuthState from '../context/auth/AuthState';
import ChatState from '../context/chat/ChatState';
import ItemState from '../context/item/ItemState';
import { useState, useContext } from 'react';
import { Button, Offcanvas, Container, Col, Row } from 'react-bootstrap';
import { LocationsContext } from '../context/contexts';
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
  const [location, setLocation] = useState({
    lat: 37.962882809573145,
    lng: -122.57822275079111
  })

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  return (
    <AuthState>
      <ItemState>
      <ChatState>
      <LocationsContext.Provider value={location}>
      <Component {...pageProps} />
      </LocationsContext.Provider>
      </ChatState>
      </ItemState>
    </AuthState>
  )
}

export default MyApp
