import AuthState from '../context/auth/AuthState';
import { useState } from 'react';
import { Button, Offcanvas, Container, Col } from 'react-bootstrap';
import NaviBar from '../components/NaviBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  return (
    <AuthState>
      <Container>
        <div>
          <img src='/Chads_list_2.svg' width='640' height='100' />
        </div>
        <div>
          <Button href='/SignUp' >SignUp</Button>
          <Button href='/Login' >Login</Button>
        </div>
        <Col>
          <Button onClick={naviShow} >menu</Button>
          <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <NaviBar />
          </Offcanvas>
          <Component {...pageProps} />
        </Col>
      </Container>

    </AuthState>
  )
}

export default MyApp
