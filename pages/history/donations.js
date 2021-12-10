import { Button, InputGroup, FormControl, Offcanvas, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch} from "react-icons/fa";
import {useState} from 'react';

const Donations = (props) => {
  let [searching, setSearching] = useState('');

  const handleSearch = (e) =>{
    setSearching(e.target.value)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/history/donations">
          My Donations
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/history/donations">My Donations</Nav.Link>
            <Nav.Link href="/history/claims">My Claims</Nav.Link>
            <Nav.Link href="/posts">Post an Item</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              LogOut
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <InputGroup>
        <FormControl
          placeholder="Search my donations..."
          value={searching}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup>
      <div>List of Donations Here</div>
    </>
  )
}

export default Donations;