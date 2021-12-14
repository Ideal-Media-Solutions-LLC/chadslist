import React, {useState} from 'react'
import { GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import {Card, Container, Row, Col, Modal} from 'react-bootstrap';
import ItemView from './ItemView.js'

//TODO: Remove after real/formatted data is provided
//SampleTest data for showing markers
const items = [
  {
    name: 'Space Needle',
    img: 'https://cdn.pixabay.com/photo/2016/11/23/01/18/red-panda-1851661_1280.jpg',
    coordinates: { lat: 47.6205, lng: -122.3493 },
  },
  {
    name: "Cal Anderson Park",
    img: 'https://cdn.pixabay.com/photo/2016/11/23/01/15/red-panda-1851650_1280.jpg',
    coordinates: { lat: 47.6173, lng: -122.3195 },
  },
]


function MapView(props) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const viewItem = () => setIsSelected(true);
  const closeItem = () => setIsSelected(false);

  const mapContainerStyle = {
    width: '400px',
    height: '400px'
  };

  const infoWindowStyle = {
    'object-fit': 'contain',
    width: '10vh',
    height: '10vh',
  }

  const center = { //TODO: to be set as User Searched center
    lat: 47.6253,
    lng: -122.3222
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return (
    <>
    {/* <LoadScript googleMapsApiKey={process.env.mapAPI} > */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onClick={(e) => {
          setSelectedMarker(null)}}
      >
        { /* Child components, such as markers, info windows, etc. */ }

        {items.map( (item, index) => {
          return (
            <Marker
              key={index}
              onLoad={onLoad}
              position={item.coordinates}
              onClick={(e)=> {
                setSelectedMarker(item)}}
            />
          )}
        )}

        {selectedMarker ? (
          <InfoWindow
            options={{pixelOffset: new window.google.maps.Size(0, -45)}}
            position={{lat: selectedMarker.coordinates.lat, lng: selectedMarker.coordinates.lng}}

          >

            <div style={infoWindowStyle} onClick={() => setIsSelected(true)} >
              <img style={{width: '100%', height: '100'}} src={selectedMarker.img} />
              <div style={{'font-size': 'x-small'}}>{selectedMarker.name} </div>
            </div>

          </InfoWindow>
        ) : null}

      </GoogleMap>
    {/* </LoadScript> */}

   <Modal centered show={isSelected} size='md' onHide={() => setIsSelected(false)}>
     <Modal.Header closeButton></Modal.Header>
     <ItemView />
   </Modal>
   </>
  )
}

export default MapView