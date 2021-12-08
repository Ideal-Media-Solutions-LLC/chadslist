import ListView from '../components/ListView.js';
import MapView from '../components/MapView.js';
import { useState } from 'react';

const HomePage = (props) => {
  const [view, setView] = useState('list');

  const ChangeView = (input) => {
    setView(input);
  }

  return (
    <div>
      Welcome back to Next.js!
      {view === 'list' ? <p onClick={() => ChangeView('map')}>Show Map</p> : <p onClick={() => ChangeView('list')}>Show List</p>}
      {view === 'map' && <MapView />}
      {view === 'list' && <ListView />}
    </div>
  )
}

export default HomePage;