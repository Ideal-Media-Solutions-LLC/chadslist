import { useState, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Nav, Image, Container } from 'react-bootstrap';
import AuthContext from '../context/auth/AuthContext';
// import Link from 'next/link';
import Avatar from '@mui/material/Avatar';

const NaviBar = (props) => {
  // console.log(user.accType)

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Container>
      <Image src='/Chads_list_2.svg' width='150' height='60' />
      <Nav defaultActiveKey="/" className="flex-column">
        {/* <div className="navbar-avatar-row">
          <Avatar alt="Travis Howard" src={user.photoUrl} style={{ height: '50px', width: '50px' }}/>
          <p>{user.userName}</p>
        </div> */}
        <Nav.Link className="text-decoration-none" onClick={props.close}><Link href='/' style={{textDecoration: 'none'}}>Home</Link></Nav.Link>
        {user && <Nav.Link onClick={props.close}><Link href="/history/donations">My Donations</Link></Nav.Link>}
        {user && <Nav.Link onClick={props.close}><Link href="/history/claims">My Claims</Link></Nav.Link>}
        {user && <Nav.Link onClick={props.close}><Link href="/history/receipts">View Receipts</Link></Nav.Link>}
        {!user ? null : <Nav.Link onClick={props.close}><Link href="/chat">View Messages</Link></Nav.Link> }
        {user && <Nav.Link onClick={props.close}><Link href="/postItem">Post an item</Link></Nav.Link>}
        { user ?
          <Nav.Link onClick={async () => {
            await Router.push('/');
            logoutUser();
          }}>
          LogOut
          </Nav.Link> :
          <>
            <Nav.Link >
              <Link href='/Login'>Login</Link>
            </Nav.Link>
            <Nav.Link >
              <Link href='/SignUp'>Register</Link>
            </Nav.Link>
          </>
        }
      </Nav>
    </Container>
  );
};

export default NaviBar;