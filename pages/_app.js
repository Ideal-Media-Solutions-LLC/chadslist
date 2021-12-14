import AuthState from '../context/auth/AuthState';
import ChatState from '../context/chat/ChatState';
import ItemState from '../context/item/ItemState';
import { useState } from 'react';
import { Button, Offcanvas, Container, Col, Row } from 'react-bootstrap';
import NaviBar from '../components/NaviBar.js';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/signup.css';
import '../styles/mapView.css'

function MyApp({ Component, pageProps }) {

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  return (
    <AuthState>
      <ItemState>
      <ChatState>
      <Container>
        <Row>
          <Col>
            <img src='/Chads_list_2.svg' width='640' height='100' />
          </Col>
          <Col>
            <Button variant="outline-primary"><Link href='/SignUp'><a>Register</a></Link></Button>
            <Button variant="outline-primary"><Link href='/Login'><a>Login</a></Link></Button>
          </Col>
          <Col>
            <img onClick={naviShow} src='https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/10/threelines.png' width='70' height='50' />
            <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <NaviBar />
            </Offcanvas>
          </Col>
        </Row>
      </Container>
      <Component {...pageProps} />
      </ChatState>
      </ItemState>
    </AuthState>
  )
}

export default MyApp
