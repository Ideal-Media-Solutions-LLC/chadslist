import React from 'react';
import AuthState from '../context/auth/AuthState';
import ChatState from '../context/chat/ChatState';
import ItemState from '../context/item/ItemState';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/signup.css';
import '../styles/mapView.css';
import '../styles/Chat.css';
import '../styles/history.css';
import '../styles/Header.css';
import '../styles/homePage.css';
import '../styles/Navbar.css';
import '../styles/Item.css';

const MyApp = ({ Component, pageProps }) => {

  return (
    <AuthState>
      <ItemState>
        <ChatState>
          <Component {...pageProps} />
        </ChatState>
      </ItemState>
    </AuthState>
  );
};

export default MyApp;
