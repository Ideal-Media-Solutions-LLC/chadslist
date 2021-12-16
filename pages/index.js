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
  const [filterItems, setFilterItems] = useState([])

  const updateList = () => {
    if(itemList.length > 0){
      setFilterItems(itemList)
    }
  }


  useEffect(updateList,[itemList]);

  const ChangeView = (input) => {
    setView(input);
  }

  const handleClick = () => setFilter(!showFilter)
  const closeFilter = () => setFilter(false)

  const handleFilter = (category) => {
    let results = itemList.filter(item => item.category === category )
    setFilterItems(results)
  }

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


  useEffect(() => {

    /*TODO:
      Some devs are experiencing issues with this function but works for those who have allowed
      permission to for sharing there location. If this this getCurrentLocation is not working,
      use these two functions below without the geolocation API with your desired location for development
    */

    //setCurrentLocation({ lat: <latitude>, lng: <longitude> })  //For center of Map
    //getItemsInRadius( lat: <latitude>, lng: <longitude> )     //For List of items in area

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
        getItemsInRadius(result.coords.latitude, result.coords.longitude)
        // getItemsInRadius();


//         getItemsInRadius(result.coords.latitude, result.coords.longitude)
//         console.log(currentLocation)
      }
    })
  }, [])

  // ~~~~~~~~~~~~~~~~ Pagination ~~~~~~~~~~~~~~~~~~~~~~

  // current page of posts being viewed, default 1
  const [page, setPage] = useState(1);

  // how many items per page being viewed, default 8
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // formula for determining which items should be viewable based on current page and number of itemsPerPage

  //apply filter list to pagination, filterlist default as itemList.
  const viewableItems = filterItems.slice((page * itemsPerPage) - itemsPerPage, page * itemsPerPage);

  const changePage = number => setPage(number);

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  const [filterTag, setFilterTag] = useState(null);

  // ~~~~~~~~~~~~~~~ Pagination End ~~~~~~~~~~~~~~~~~~~~


  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.mapAPI}>
        <Container>
        <Row className="header">
            <Col>
              <img className="home-page-logo" src='/Chads_list_2.svg' width='300' height='100' />
            </Col>
            <Col className="home-page-buttons">
              <img id="hamburger-menu-home-page" onClick={naviShow} src='/dropdown_menu.svg' width='50' height='50' />
              <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <NaviBar close={closeNavi}/>
              </Offcanvas>
            </Col>
        </Row>
          <Row>
            <Col md="auto">
              <Button id='filter-button' onClick={handleClick}>Filter</Button>
              <Offcanvas show={showFilter} onHide={closeFilter} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <FilterList setFilterTag={setFilterTag} close={closeFilter} handleFilter={handleFilter}/>
              </Offcanvas>
            </Col>

            <Col>
              <Search setCurrentLocation={setCurrentLocation} getLocationFromAddress={getLocationFromAddress}/>
            </Col>

            <Col xs lg="2">
              {view === 'list'
                ? <FaMapMarkedAlt size='40' onClick={() => ChangeView('map')} />
                : <RiLayoutGridFill size='40' onClick={() => ChangeView('list')} />}
            </Col>
          </Row>
          {filterTag && <Row>
            <div>
              Filter: {filterTag} < span onClick={() => {
                setFilterItems(itemList);
                setFilterTag(null);
                }}> x</span>
              </div>
              </Row>}
          <Col>
            {view === 'map' && <MapView viewableItems={viewableItems} currentLocation={currentLocation}/>}
            <ListView viewableItems={viewableItems} filterItems={filterItems}/>
            <PageSelector itemsPerPage={itemsPerPage} itemsTotal={itemList.length} changePage={changePage}/>
          </Col>
        </Container>
      </LoadScript>
    </div>
  )
}

export default HomePage;