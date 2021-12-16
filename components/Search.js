import { Form, Row, Col, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch} from "react-icons/fa";
import {useState} from 'react';

const Search = (props) => {
  // let [searching, setSearching] = useState('');///

  let [searchItem, setSearchItem] = useState('');
  let [searchAddress, setSearchAddress] = useState('');
  let [distance, setDistance] = useState('')

  const handleSearch = (e) =>{
    setSearching(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submited:', searchItem, searchAddress, distance)
  }

  const handleSelector = (e) =>{
    console.log('DropDown: ', e.target.value)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Text>Find</InputGroup.Text>
              <FormControl
                placeholder='Item'
                value={searchItem}
                onChange={(e)=>setSearchItem(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col>
            <Form.Select value='Distance' onChange={(e) => setDistance(e.target.value)}>
              {/* <Form.control placeholder='Distance'/> */}
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup >
              <InputGroup.Text>Near</InputGroup.Text>
              <FormControl placeholder='Address'
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />

            </InputGroup>
          </Col>
          <Col>
          <Button type="submit">
            <FaSearch />
            </Button>

          </Col>
        </Row>

      </Form>
{/*
      <InputGroup>
        <InputGroup.Text>Find</InputGroup.Text>
        <FormControl
          placeholder='Item'
          value={searching}
          onChange={handleSearch}
        />

        <InputGroup.Text>Near</InputGroup.Text>
        <FormControl
          placeholder='Address'
        />
        <DropdownButton
        alignRight
        title='Distance'
        value={() => setDistance(value)}
        onSelect={handleDropDown}
        >
          <Dropdown.Item> 1 </Dropdown.Item>
          <Dropdown.Item value={5}> 5 </Dropdown.Item>
          <Dropdown.Item value={10}> 10 </Dropdown.Item>
          <Dropdown.Item value={25}> 25 </Dropdown.Item>
        </DropdownButton>
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup> */}
    </>
  )
}

export default Search;


