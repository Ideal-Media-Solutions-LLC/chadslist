import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import NaviBar from '../components/NaviBar.js';
import { Button, Offcanvas, Container, Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterList from '../components/FilterList.js';
import Search from '../components/Search.js';
import { useState } from 'react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";



const HomePage = (props) => {
  const [view, setView] = useState('list');
  const [showFilter, setFilter] = useState(false);

  const ChangeView = (input) => {
    setView(input);
  }

  const handleClick = () => setFilter(!showFilter)
  const closeFilter = () => setFilter(false)


  return (
    <div>
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
    </div>
  )
}

export default HomePage;