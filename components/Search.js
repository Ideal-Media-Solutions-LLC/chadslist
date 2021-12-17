import { Form, Row, Col, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import {useState, useContext, useEffect } from 'react';
import ItemContext from '../context/item/ItemContext';
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";


const Search = ({ ChangeView, setCurrentLocation, handleClick, wordFilter}) => {

  let [searchItem, setSearchItem] = useState('');
  let [searchAddress, setSearchAddress] = useState('');
  let [distance, setDistance] = useState('')
  let [mapToggle, setMapToggle] = useState('list')

  const { getItemsInRadius, itemList, filterItems } = useContext(ItemContext)

  const getLocationFromAddress = (address, callback) => {
    address = address || 'San Francisco'; //Defaults to SF

    const Geocoder = new window.google.maps.Geocoder();
    Geocoder.geocode({address : address}, (result, status) => {
      const lat = result[0].geometry.location.lat()
      const lng = result[0].geometry.location.lng()
      if (status === 'OK') {
        console.log(`'${address}' geocoded to \nlat: ${lat} \nlng: ${lng}`)
        callback(lat, lng)
      } else {
        console.log(status, `Was not able to retrieve geocode from '${address}`)
      }
    })
  }


  // useEffect(() => {
  //   filterItems(searchItem)
  // }, [itemList])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submited:', searchItem, searchAddress, distance)
    getLocationFromAddress(searchAddress, (async (lat, lng) => {
      await getItemsInRadius(lat, lng, distance, searchItem)
      setCurrentLocation({lat: lat, lng: lng})
      // filterItems(searchItem)
    })
    )
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="search-row">
        <Button id='filter-button' onClick={handleClick} style={{ marginRight: '10px'}}>Filter</Button>
          <div className="search-row-input">
            <InputGroup>
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
          <div className="address-row-input">
            <InputGroup >
              <FormControl placeholder='Search by Address'
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </InputGroup>
            </div>
            <div className="search-row-radius">
            <Form.Select value={distance} onChange={(e) => setDistance(e.target.value)}>
              <option value="" disabled defaultValue>Radius</option>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </Form.Select>
            </div>
            <div className="map-container" >
             { mapToggle === 'list' ? <FaMapMarkerAlt size='35' color='#0b5ed7' onClick={() =>  { ChangeView('map')
             setMapToggle('map')
            }}/> :<RiLayoutGridFill size='35' color='#0b5ed7' onClick={() => {
              ChangeView('list')
              setMapToggle('list')
            }} /> }
            </div>
        </div>
      </Form>

    </>
  )
}

export default Search;


