import {useState} from 'react';
import Link from 'next/link';
import {Nav} from 'react-bootstrap';


const NaviBar = (props) => {


  return (
    <Nav defaultActiveKey="/" className="flex-column">
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/donations">My Donations</Nav.Link>
    <Nav.Link href="/Claims">My Claims</Nav.Link>
    <Nav.Link href="/posts">Post an Item</Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
      LogOut
    </Nav.Link>
  </Nav>
  )
}

export default NaviBar;