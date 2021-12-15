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
import PageSelector from '../components/PageSelector.js';

const HomePage = (props) => {
  const [view, setView] = useState('list');
  const [showFilter, setFilter] = useState(false);
  const { getItemsInRadius, itemList } = useContext(ItemContext)
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
        // As we are testing we don't have any items in most locations so I'm going to
        // getItemsInRadius(result.coords.latitude, result.coords.longitude)
        getItemsInRadius();

        console.log(currentLocation)
      }
    })
  }, [])

  // ~~~~~~~~~~~~~~~~ Pagination ~~~~~~~~~~~~~~~~~~~~~~

  // current page of posts being viewed, default 1
  const [page, setPage] = useState(1);

  // how many items per page being viewed, default 8
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // formula for determining which items should be viewable based on current page and number of itemsPerPage
  const viewableItems = itemList.slice((page * itemsPerPage) - itemsPerPage, page * itemsPerPage);

  const changePage = number => setPage(number);

  // ~~~~~~~~~~~~~~~ Pagination End ~~~~~~~~~~~~~~~~~~~~


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
            {view === 'map' && <MapView viewableItems={viewableItems} currentLocation={currentLocation}/>}
            <ListView viewableItems={viewableItems}/>
            <PageSelector itemsPerPage={itemsPerPage} itemsTotal={itemList.length} changePage={changePage}/>
          </Col>
        </Container>
      </LoadScript>
    </div>
  )
}

export default HomePage;