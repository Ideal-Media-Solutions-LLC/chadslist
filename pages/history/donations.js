import { Button, Offcanvas, Nav, Navbar, Row, Col } from 'react-bootstrap';
import NaviBar from '../../components/NaviBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import HistoryList from '../../components/HistoryList.js';

const Donations = (props) => {

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  return (
    <>
     <Row className="header">
            <Col>
              <img className="home-page-logo" src='/Chads_list_2.svg' width='300' height='100' />
            </Col>
            <Col className="home-page-buttons">
              <img id="hamburger-menu-home-page" onClick={naviShow} src='/dropdown_menu.svg' width='50' height='50' />
              <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <NaviBar close={closeNavi}/>
              </Offcanvas>
            </Col>
        </Row>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/history/donations">
          My Donations
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/history/donations">My Donations</Nav.Link>
            <Nav.Link href="/history/claims">My Claims</Nav.Link>
            <Nav.Link href="/posts">Post an Item</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              LogOut
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <HistoryList histType='donations'/>
    </>
  )
}

export default Donations;