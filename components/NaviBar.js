import { useState, useContext } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import AuthContext from '../context/auth/AuthContext';

const NaviBar = (props) => {

  const { user, logoutUser } = useContext(AuthContext)

  return (
    <div>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/history/donations">My Donations</Nav.Link>
        <Nav.Link href="/history/claims">My Claims</Nav.Link>
        <Nav.Link href="/postItem">Post an Item</Nav.Link>
        { user ?
        <Nav.Link onClick={logoutUser}>
          LogOut
        </Nav.Link> :
        <>
        <Nav.Link href="/Login" >
          Log In
        </Nav.Link>
        <Nav.Link href="/SignUp" >
          Register
        </Nav.Link>
        </>
        }
      </Nav>
    </div>
  )
}

export default NaviBar;