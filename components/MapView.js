import {useState, useEffect} from 'react'
import { GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import {Card, Container, Row, Col, Modal} from 'react-bootstrap';
import ItemView from './ItemView.js'


function MapView({viewableItems, currentLocation}) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [markers, setMarkers] = useState({}) //objects to interact with GoogleMaps API


  const viewItem = () => setIsSelected(true);
  const closeItem = () => setIsSelected(false);

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const infoWindowStyle = {
    'object-fit': 'contain',
    width: '10vh',
    height: '10vh',
  }

  const onLoad = (newMarker, index) => {
    let newMarkers = markers
    newMarkers[index] = newMarker
    setMarkers(newMarkers)
  }

  const handleMouseDown = (index) => {
    markers[index].setLabel({color: 'black', text: (index + 1).toString()})
  }

  const handleMouseUp = (index, item) => {
    setSelectedMarker(item)
    markers[index].setLabel({color: 'white', text: (index + 1).toString()})
  }

  useEffect( () => {
    setSelectedMarker(null)
    }, [viewableItems]
  )


  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation}
        zoom={13}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onClick={(e) => {
          setSelectedMarker(null)}}
      >

        {viewableItems.map( (item, index) => {
          return (
            <Marker
              key={index}
              onLoad={(marker) => onLoad(marker, index)}
              position={{lat: item.latitude, lng: item.longitude}}
              label= {{
                color: 'white',
                'fontSize': '14px',
                'fontWeight': '600',
                text: (index + 1).toString()
              }}
              onMouseDown={() => handleMouseDown(index)}
              onMouseUp={()=> handleMouseUp(index, item)}
            />
          )}
        )}

        {selectedMarker ? (
          <InfoWindow
            options={{pixelOffset: new window.google.maps.Size(0, -45)}}
            position={{lat: selectedMarker.latitude, lng: selectedMarker.longitude}}
          >

            <div style={infoWindowStyle} onClick={() => setIsSelected(true)} >
              <img style={{width: '100%', height: '100'}} src={selectedMarker.imageUrl} />
              <div style={{'fontSize': 'x-small'}}>{selectedMarker.name} </div>
            </div>

          </InfoWindow>
        ) : null}

      </GoogleMap>

   <Modal centered show={isSelected} size='md' onHide={() => setIsSelected(false)}>
     <Modal.Header closeButton></Modal.Header>
     <ItemView data={selectedMarker}/>
   </Modal>
   </>
  )
}

export default MapView