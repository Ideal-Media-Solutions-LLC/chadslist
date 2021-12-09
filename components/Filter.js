import { Nav, Button, Navbar, Collapse, Fade } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

import ItemView from './ItemView.js'

const Filter = ({handleClick}) => {
  const [show, setShow] = useState(true);


  return (
    <>
      <Collapse in={show} >
        <div id="example-collapse-text">
          <div>Here is Filter</div>
          <Image src='/Chads_list.svg' width='90' height='90' />
          <Button>sign up button</Button>
          <Button>login button</Button>
          <Nav defaultActiveKey="/" className="flex-column">
            <Navbar.Brand >Select Category</Navbar.Brand>
            <Nav.Link eventKey="filter-1"
            onClick={() => setShow(!show)}
            aria-controls="example-collapse-text"
            aria-expanded={show}>
            {/* onClick={() => handleClick()}> */}
              Apparel
            </Nav.Link>
            <Nav.Item>
            <Image src='/electronics_1.svg' width='90' height='90' />
            <Nav.Link eventKey="filter-2">Electronics</Nav.Link>
            </Nav.Item>
            <Nav.Link eventKey="filter-3">Entertainment</Nav.Link>
            <Nav.Link eventKey="filter-4">Garden and Outdoor</Nav.Link>
            <Nav.Link eventKey="filter-5">Hobbies</Nav.Link>
            <Nav.Link eventKey="filter-6">Home Goods</Nav.Link>
            <Nav.Link eventKey="filter-7">Musical Instruments</Nav.Link>
            <Nav.Link eventKey="filter-8">Office Supplies</Nav.Link>
            <Nav.Link eventKey="filter-9">Pet Supplies</Nav.Link>
            <Nav.Link eventKey="filter-10">Sporting Goods</Nav.Link>
          </Nav>
          {/* <ItemView /> */}
        </div>
      </Collapse>
    </>
  )
}

export default Filter;
