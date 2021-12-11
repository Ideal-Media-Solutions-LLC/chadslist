import React, {useState} from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';


//TODO: Remove after real/formatted data is provided
//SampleTest data for showing markers
const items = [
  {
    name: 'Space Needle',
    coordinates: { lat: 47.6205, lng: -122.3493 },
  },
  {
    name: "Cal Anderson Park",
    coordinates: { lat: 47.6173, lng: -122.3195 },
  },
]



function MapView(props) {

  // const {isLoaded, loadError} = useLoadScript({
  //   googleMapsApiKey:process.env.mapAPI
  // })

  // if ( loadError) return 'Error Loading Maps';
  // if ( !isLoaded) return 'Loading Maps';

  const [selected, setSelected] = useState(null)



  const position = { lat: 47.61483, lng: -122.3146 }


  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: 47.6253,
    lng: -122.3222
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.mapAPI}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      {items.map( (item, index) => {
        return (
        <Marker
          key={index}
          onLoad={onLoad}
          position={item.coordinates}
          onClick={(e)=> {
            setSelected(item)}}
        />
        )}
        )})}

          {selected ? (
          <InfoWindow
            options={{
              pixelOffset: new window.google.maps.Size(0, -45),
             }}
            position={{lat: selected.coordinates.lat, lng: selected.coordinates.lng}}

            onCloseClick={() => {
              setSelected(null)
            }}
          >
          <div>INFO</div>
          </InfoWindow>
          ) : null}


      </GoogleMap>
    // </LoadScript>
  )
}

export default MapView