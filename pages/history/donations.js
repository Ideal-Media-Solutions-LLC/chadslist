import { Button, Offcanvas, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react';
import HistoryList from '../../components/HistoryList.js';

const Donations = (props) => {

  return (
    <>
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