import { Nav, Button, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react';

const Filter = (props) => {

  return (
    <>
      <div>Here is Filter</div>
      <div>Logo</div>
      <Button>sign up button</Button>
      <Button>login button</Button>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Navbar.Brand >Select Category</Navbar.Brand>
        <Nav.Link eventKey="filter-1">Apparel</Nav.Link>
        <Nav.Link eventKey="filter-2">Electronics</Nav.Link>
        <Nav.Link eventKey="filter-3">Entertainment</Nav.Link>
        <Nav.Link eventKey="filter-4">Garden and Outdoor</Nav.Link>
        <Nav.Link eventKey="filter-5">Hobbies</Nav.Link>
        <Nav.Link eventKey="filter-6">Home Goods</Nav.Link>
        <Nav.Link eventKey="filter-7">Musical Instruments</Nav.Link>
        <Nav.Link eventKey="filter-8">Office Supplies</Nav.Link>
        <Nav.Link eventKey="filter-9">Pet Supplies</Nav.Link>
        <Nav.Link eventKey="filter-10">Sporting Goods</Nav.Link>
      </Nav>
    </>
  )
}

export default Filter;
