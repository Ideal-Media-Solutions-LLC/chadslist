import React from 'react'
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';
import {mapsAPI} from '../tempConfig.js'

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 47.6253,
  lng: -122.3222
};

function MapView(props) {
  return (
    <LoadScriptNext
      googleMapsApiKey={mapsAPI}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScriptNext>
  )
}

export default React.memo(MapView)