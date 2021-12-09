import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import NaviBar from '../components/NaviBar.js';
import { Button, Offcanvas } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from '../components/Filter.js';
import Search from '../components/Search.js';
import { useState } from 'react';

const HomePage = (props) => {
  const [view, setView] = useState('list');
  const [showFilter, setFilter] = useState(false);
  const [showNavi, setNavi] = useState(false);

  const ChangeView = (input) => {
    setView(input);
  }

  const handleClick = () => setFilter(!showFilter)
  const closeFilter = () => setFilter(false)

  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  return (
    <div>
      <div>
        <Image src='/Chads_list_2.svg' width='640' height='100' />
      </div>
      <div>
        <Button href='/SignUp' >SignUp</Button>
        <Button href='/Login' >Login</Button>
      </div>
      <Search />
      <div>
        <Button onClick={naviShow} >menu</Button>
        <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <NaviBar />
        </Offcanvas>
      </div>
      <Button onClick={handleClick}>filter</Button>
      <Offcanvas show={showFilter} onHide={closeFilter} >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Filter />
      </Offcanvas>

      {view === 'list' ? <p onClick={() => ChangeView('map')}>Show Map</p> : <p onClick={() => ChangeView('list')}>Show List</p>}
      {view === 'map' && <MapView />}
      {view === 'list' && <ListView />}
    </div>
  )
}

export default HomePage;