import { Nav, Button, Navbar, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

const Filter = (props) => {
  return (
    <>
      <InputGroup>
        <Image src='/Chads_list_2.svg' width='200' height='60' />
        <Button>sign up</Button>
        <Button>login</Button>
      </InputGroup>

      <Nav defaultActiveKey="/" className="flex-column">
        <Navbar.Brand >Select Category</Navbar.Brand>
        <InputGroup>
          <Image src='/apparel_2.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-1">Apparel</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/electronics_1.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-2">Electronics</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/entertainment.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-3">Entertainment</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/gardening_1.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-4">Garden and Outdoor</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/hobbies.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-5">Hobbies</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/home_1.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-6">Home Goods</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/instrument.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-7">Musical Instruments</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/office.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-8">Office Supplies</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/pets.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-9">Pet Supplies</Nav.Link>
        </InputGroup>

        <InputGroup>
          <Image src='/sports.svg' width='40' height='40' />
          <Nav.Link eventKey="filter-10">Sporting Goods</Nav.Link>
        </InputGroup>
      </Nav>
      {/* <ItemView /> */}
    </>
  )
}

export default Filter;
