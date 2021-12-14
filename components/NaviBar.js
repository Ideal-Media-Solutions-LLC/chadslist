import { useState, useContext } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import AuthContext from '../context/auth/AuthContext';

const NaviBar = (props) => {

  const { user, logoutUser } = useContext(AuthContext)

  return (
    <div>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link ><Link href='/'><a>Home</a></Link></Nav.Link>
        <Nav.Link ><Link href="/history/donations"><a>My Donations</a></Link></Nav.Link>
        <Nav.Link ><Link href="/history/claims"><a>My Claims</a></Link></Nav.Link>
        <Nav.Link ><Link href="/postItem/PostItem"><a>Post an item</a></Link></Nav.Link>
        { user ?
        <Nav.Link onClick={logoutUser}>
          LogOut
        </Nav.Link> :
        <>
        <Nav.Link >
        <Link href='/Login'><a>Login</a></Link>
        </Nav.Link>
        <Nav.Link >
        <Link href='/SignUp'><a>Register</a></Link>
        </Nav.Link>
        </>
        }
      </Nav>
    </div>
  )
}

export default NaviBar;