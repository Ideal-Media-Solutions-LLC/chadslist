import React from 'react';
import GoogleMapReact from 'google-map-react';
import {mapsAPI} from '../tempConfig.js'


const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const map = new google.maps.Map(mapDiv, mapOptions);

const MapView = (props) => {
  const defaultProps = {
    center: {
      lat: 	47.620422,
      lng: -122.349358
    },
    zoom: 11
  };



  return (



      // <div >
      //   <Image src='/MapViewPlaceHolder.png' width='640' height='780'/>
      // </div>

      <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapsAPI }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>

  )
}

export default MapView;