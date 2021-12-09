import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import NaviBar from '../components/NaviBar.js';
import { button } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import Filter from '../components/Filter.js';
import Search from '../components/Search.js';
import { useState } from 'react';

const HomePage = (props) => {
  const [view, setView] = useState('list');
  const [isClick, setIsClick] = useState(false);

  const ChangeView = (input) => {
    setView(input);
  }

  const handleClick = () => {
    setIsClick(!isClick);
  }

  return (
    <div>
      <div>
        <Image src='/Chads_list_2.svg' width='640' height='100' />
      </div>
       <Search />
      <NaviBar />
      <Button onClick={() => handleClick()}>filter</Button>
      {isClick ? <Filter /> : <></>}
      {view === 'list' ? <p onClick={() => ChangeView('map')}>Show Map</p> : <p onClick={() => ChangeView('list')}>Show List</p>}
      {view === 'map' && <MapView />}
      {view === 'list' && <ListView />}
    </div>
  )
}

export default HomePage;