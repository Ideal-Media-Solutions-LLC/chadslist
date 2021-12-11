import { Nav, Button, Navbar, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

const Filter = ({filter}) => {

  return (
    <>
      <InputGroup>
        <Image src={filter.src} width='40' height='40' />
        <Nav.Link >{filter.category}</Nav.Link>
      </InputGroup>
    </>
  )
}

export default Filter;

