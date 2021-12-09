import {useState} from 'react';
import Link from 'next/link';
import CloseButton from 'react-bootstrap/CloseButton';

const NaviBar = (props) => {


  return (
    <div >
      <CloseButton />
      <div> > </div>
      <div>
        <Link href="/">
        <a>Home</a>
        </Link>
      </div>
      <div>
        <Link href="/donation">
        <a>My Donations</a>
        </Link>
      </div>
      <div>
        <Link href="/claim">
         <a>My Claims</a>
         </Link>
      </div>
      <div>
        <Link href="/">
         <a>LogOut</a>
        </Link>
      </div>
    </div>
  )
}

export default NaviBar;