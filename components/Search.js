import { Form, Row, Col, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch} from "react-icons/fa";
import {useState, useContext} from 'react';
import ItemContext from '../context/item/ItemContext';

const Search = ({setCurrentLocation, getLocationFromAddress, wordFilter, filterItems}) => {

  let [searchItem, setSearchItem] = useState('');
  let [searchAddress, setSearchAddress] = useState('');
  let [distance, setDistance] = useState(25);

  const { getItemsInRadius, itemList } = useContext(ItemContext)

  const handleSearch = (e) =>{
    setSearching(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getLocationFromAddress(searchAddress, (async (lat, lng) => {
    await getItemsInRadius(lat, lng, distance)
    setCurrentLocation({lat: lat, lng: lng})
    wordFilter(searchItem)
    }))
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
            <Form.Select value={distance} onChange={(e) => setDistance(e.target.value)}>
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
    </>
  )
}

export default Search;


