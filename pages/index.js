import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import NaviBar from '../components/NaviBar.js';
import { Button, Offcanvas, Container, Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterList from '../components/FilterList.js';
import Search from '../components/Search.js';
import { useState, useEffect, useContext } from 'react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";
import {LoadScript} from '@react-google-maps/api';
import { getItemsInRadius } from '../context/item/ItemContext';
import ItemContext from '../context/item/ItemContext'


const HomePage = (props) => {
  const [view, setView] = useState('list');
  const [showFilter, setFilter] = useState(false);
  const { getItemsInRadius } = useContext(ItemContext)
  const SF_LOCATION = { lat: 37.962882809573145, lng: -122.57822275079111}
  const [currentLocation, setCurrentLocation] = useState(SF_LOCATION)

  const ChangeView = (input) => {
    setView(input);
  }

  const handleClick = () => setFilter(!showFilter)
  const closeFilter = () => setFilter(false)


  const getLocationFromAddress = (address) => {
    address = address || 'New York City'; //TODO: Remove default in Production

    const Geocoder = new window.google.maps.Geocoder();

    Geocoder.geocode({address : address}, (result, status) => {
      const lat = result[0].geometry.location.lat()
      const lng = result[0].geometry.location.lng()
      if (status === 'OK') {
        console.log(`'${address}' geocoded to \nlat: ${lat} \nlng: ${lng}`)
      } else {
        console.log(status, `Was not able to retrieve geocode from '${address}`)
      }
    })
  }


  useEffect(() => {
    //Acquire User Location
    navigator.geolocation.getCurrentPosition((result, error) => {
      if (error){
        console.log(error)
      } else {
        setCurrentLocation({
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        })
        getItemsInRadius(result.coords.latitude, result.coords.longitude)

        console.log(currentLocation)
      }
    })
  }, [])


  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.mapAPI}>
        <Container>
          <Row>
            <Col md="auto">
              <Button onClick={handleClick}>filter</Button>
              <Offcanvas show={showFilter} onHide={closeFilter} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <FilterList />
              </Offcanvas>
            </Col>

            <Col>
              <Search />
            </Col>

            <Col xs lg="2">
              {view === 'list'
                ? <FaMapMarkedAlt size='40' onClick={() => ChangeView('map')} />
                : <RiLayoutGridFill size='40' onClick={() => ChangeView('list')} />}
            </Col>
          </Row>
          <Col>
            {view === 'map' && <MapView />}
            {view === 'list' && <ListView />}
          </Col>
        </Container>
      </LoadScript>
    </div>
  )
}

export default HomePage;