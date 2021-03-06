import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import NaviBar from '../components/NaviBar.js';
import { Button, Offcanvas, Container, Col, Row, CloseButton, InputGroup} from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterList from '../components/FilterList.js';
import Search from '../components/Search.js';
import { useState, useEffect, useContext } from 'react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";
import {LoadScript} from '@react-google-maps/api';
import ItemContext from '../context/item/ItemContext'
import PageSelector from '../components/PageSelector.js';
import Avatar from '@mui/material/Avatar';
import AuthContext from '../context/auth/AuthContext';
import { FaSearch} from "react-icons/fa";

import { autoLogin } from '../context/authHelper.js'

// export const getServerSideProps = async function getServerSideProps(context) {
//   const user = await autoLogin();
//   return {
//     props: {
//       user,
//       test: 'testing'
//     }
//   }
// }

const HomePage = ({ user }) => {
  const [view, setView] = useState('list');
  const [showFilter, setFilter] = useState(false);
  // const { user } = useContext(AuthContext);
  console.log(user)
  const { getItemsInRadius, itemList, filterItems } = useContext(ItemContext)
  const SF_LOCATION = { lat: 37.962882809573145, lng: -122.57822275079111}
  const [currentLocation, setCurrentLocation] = useState(SF_LOCATION)  //Supplies Map component, is updated from Search

  const ChangeView = (input) => {
    setView(input);
  }

  const handleClick = () => setFilter(!showFilter)
  const closeFilter = () => setFilter(false)

  const categoryFilter = (category) => {
    let radius;
    getItemsInRadius(currentLocation.lat, currentLocation.lng, radius, category)
  }


  // useEffect(() => {
  //   /*TODO:
  //     Some devs are experiencing issues with this function but works for those who have allowed
  //     permission to for sharing there location. If this this getCurrentLocation is not working,
  //     use these two functions below without the geolocation API with your desired location for development
  //   */

  //   //Note
  //   //setCurrentLocation({ lat: <latitude>, lng: <longitude> })  //For center of Map
  //   //getItemsInRadius( lat: <latitude>, lng: <longitude> )     //For List of items in area

  //   //Acquire User Locations
  //   navigator.geolocation.getCurrentPosition((result, error) => {
  //     if (error){
  //       console.log(error)
  //     } else {
  //       setCurrentLocation({
  //         lat: result.coords.latitude,
  //         lng: result.coords.longitude,
  //       })
  //      getItemsInRadius(result.coords.latitude, result.coords.longitude)
  //     }
  //   })
  // }, [])

  // ~~~~~~~~~~~~~~~~ Pagination ~~~~~~~~~~~~~~~~~~~~~~

  // current page of posts being viewed, default 1
  const [page, setPage] = useState(1);

  // how many items per page being viewed, default 8
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // formula for determining which items should be viewable based on current page and number of itemsPerPage

  //apply filter list to pagination, filterlist default as itemList.
  const viewableItems = itemList.slice((page * itemsPerPage) - itemsPerPage, page * itemsPerPage);

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
              <img className="home-page-logo" src='/Chads_list_2.svg' width='230' height='100' />
            </Col>
            <Col className="home-page-buttons">
              {user ? <div className="avatar-header-row" onClick={naviShow}>
                <Avatar alt="Travis Howard" src={user.photoUrl} style={{ height: '35px', width: '35px', marginRight: '8px' }}/>
                <div style={{ marginTop: '12px', fontWeight: 'bold', display: 'flex', flexWrap: 'wrap' }}>
                {/* <p>{user.userName}</p> */}
                </div>
              </div> :   <img id="hamburger-menu-home-page" onClick={naviShow} src='/dropdown_menu.svg' width='50' height='50' /> }

              <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <NaviBar close={closeNavi}/>
              </Offcanvas>
            </Col>
        </Row>
              <Offcanvas show={showFilter} onHide={closeFilter} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <FilterList setFilterTag={setFilterTag} close={closeFilter} categoryFilter={categoryFilter}/>
              </Offcanvas>

              <Search ChangeView={ChangeView} setCurrentLocation={setCurrentLocation} handleClick={handleClick}/>

          {/* {filterTag && <Row>
            <div>
              <Button variant="primary" size="sm" onClick={() => {
                let radius
                let category
                getItemsInRadius(currentLocation.lat, currentLocation.lng, radius, category)
                setFilterTag(null)}}>
                Filter: {filterTag}  X
              </Button>
            </div>
          </Row>} */}
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