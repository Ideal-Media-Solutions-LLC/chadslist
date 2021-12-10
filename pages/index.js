import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import NaviBar from '../components/NaviBar.js';
import { Button, Offcanvas, Container, Col } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from '../components/Filter.js';
import Search from '../components/Search.js';
import { useState } from 'react';

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
        <Col>
          <Search />
          <Button onClick={handleClick}>filter</Button>
          <Offcanvas show={showFilter} onHide={closeFilter} >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Filter />
          </Offcanvas>

          {view === 'list' ? <p onClick={() => ChangeView('map')}>Show Map</p> : <p onClick={() => ChangeView('list')}>Show List</p>}
          {view === 'map' && <MapView />}
          {view === 'list' && <ListView />}
        </Col>
      </Container>
    </div>
  )
}

export default HomePage;