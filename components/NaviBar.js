import {useState} from 'react';
import Link from 'next/link';

const NaviBar = (props) => {


  return (
    <div>
      <div> > </div>
      <div>
        <Link href="/">
        <a>Home</a>
      </div>
      <div>
        <Link href="/">
        <a>My Donations</a>
      </div>
      <div>
        <Link href="/">
         <a>My Claims</a>
      </div>
      <div>
        <Link href="/">
         <a>LogOut</a>
      </div>
    </div>
  )
}

export default NaviBar;