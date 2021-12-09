import {useState} from 'react';
import Link from 'next/link';


const NaviBar = (props) => {


  return (
    <div >
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
        <Link href="/post">
         <a>Post an Item</a>
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