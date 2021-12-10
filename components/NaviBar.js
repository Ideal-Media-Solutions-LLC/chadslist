import { useState } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';


const NaviBar = (props) => {


  return (
    <div>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/history/donations">My Donations</Nav.Link>
        <Nav.Link href="/history/claims">My Claims</Nav.Link>
        <Nav.Link href="/postItem/PostItem">Post an Item</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          LogOut
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default NaviBar;