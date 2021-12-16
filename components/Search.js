import { Form, Row, Col, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch} from "react-icons/fa";
import {useState, useContext} from 'react';
import ItemContext from '../context/item/ItemContext';
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";

const Search = ({ ChangeView }) => {
  // let [searching, setSearching] = useState('');///
  const SF_LOCATION = { lat: 37.962882809573145, lng: -122.57822275079111}
  const [currentLocation, setCurrentLocation] = useState(SF_LOCATION)
  let [searchItem, setSearchItem] = useState('');
  let [searchAddress, setSearchAddress] = useState('');
  let [distance, setDistance] = useState('')
  let [mapToggle, setMapToggle] = useState('list')

  const { getItemsInRadius } = useContext(ItemContext)

  const getLocationFromAddress = (address, callback) => {
    address = address || 'New York City'; //TODO: Remove default in Production

    const Geocoder = new window.google.maps.Geocoder();

    Geocoder.geocode({address : address}, (result, status) => {
      const lat = result[0].geometry.location.lat()
      const lng = result[0].geometry.location.lng()
      if (status === 'OK') {
        console.log(`'${address}' geocoded to \nlat: ${lat} \nlng: ${lng}`)
        console.log(callback)
        callback(lat, lng)
      } else {
        console.log(status, `Was not able to retrieve geocode from '${address}`)

      }
    })
  }


  const handleSearch = (e) =>{
    setSearching(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //Changing search location, to get the list of itemns
    //Change the center of the map, so you see items
    console.log('Submited:', searchItem, searchAddress, distance)
    //transform coordinate
    //getLocationFromAddress
    //pass coordinate to  getItemsInRadius( )
    //setCurrentLocation
    getLocationFromAddress(searchAddress, ( (lat, lng) => {
      console.log('RUNNING', lat, lng)
      getItemsInRadius(lat, lng, distance)
      setCurrentLocation({lat: lat, lng: lng})
    })
    )
  }

  const handleSelector = (e) =>{
    console.log('DropDown: ', e.target.value)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="search-row">
        <Button id='filter-button' style={{ marginRight: '10px'}}>Filter</Button>
          <div className="search-row-input">
            <InputGroup>
              {/* <InputGroup.Text>Find</InputGroup.Text> */}
              <FormControl
                placeholder='Search for items'
                value={searchItem}
                onChange={(e)=>setSearchItem(e.target.value)}
              />
            </InputGroup>
            </div>
            <Button type="submit">
              <FaSearch />
            </Button>
        </div>
        <div className="address-row">
          {/* <Col> */}
          <div className="address-row-input">
            <InputGroup >
              {/* <InputGroup.Text>Near</InputGroup.Text> */}
              <FormControl placeholder='Search by Address'
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />

            </InputGroup>
            </div>
            <div className="search-row-radius">
            <Form.Select value={distance} onChange={(e) => setDistance(e.target.value)}>
              {/* <Form.control placeholder='Distance'/> */}
              <option value="" disabled selected>Radius</option>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </Form.Select>
            {/* <MapView viewableItems={viewableItems} currentLocation={currentLocation}/> */}
            </div>
            <div className="map-container" >
             { mapToggle === 'list' ? <FaMapMarkedAlt size='40' onClick={() =>  { ChangeView('map')
             setMapToggle('map')
            }}/> :<RiLayoutGridFill size='40' onClick={() => {
              ChangeView('list')
              setMapToggle('list')
            }} /> }
            </div>
          {/* </Col> */}
          {/* <Col> */}
          {/* <Button type="submit">
            <FaSearch />
            </Button> */}
        </div>
          {/* </Col> */}
        {/* </Row> */}

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


