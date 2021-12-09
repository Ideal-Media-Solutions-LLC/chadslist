import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import Filter from '../components/Filter.js';
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
      Welcome back to Next.js!
      <button  onClick={() => handleClick()}>filter</button>
      {isClick? <Filter/>:<></>}
      {view === 'list' ? <p onClick={() => ChangeView('map')}>Show Map</p> : <p onClick={() => ChangeView('list')}>Show List</p>}
      {view === 'map' && <MapView />}
      {view === 'list' && <ListView />}
    </div>
  )
}

export default HomePage;