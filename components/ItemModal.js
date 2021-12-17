import { Card, Container, Row, Col, Modal} from 'react-bootstrap';
import { useState, useEffect } from 'react'
import ItemView from './ItemView';
import {LoadScript} from '@react-google-maps/api';

const ItemModal = ({ data, onHistClick, page, revoke, toggleModal }) => {
  const [show, setShow] = useState(true);
  const [address, setAddress] = useState('')

  /*
  Converts location coordinates to Human Readable address string
  Results may include a Google 'Plus Code' due to the mock data point
  locations of items being in places that have no proper address.
  */
  const geocoder = new google.maps.Geocoder();

  useEffect( () => {
    geocoder.geocode({location: {
      lat: data.latitude,
      lng: data.longitude
    }})
    .then( response => {
      console.log(response)
      if (response.results[1]) {
       setAddress(response.results[1].formatted_address)
      }
    })}, [data])

    const imageVerification  = (e) => {
      e.target.onerror = null;
      e.target.src = '/alt.png';
    };


  if (page === 'history') {
    return (
      // <LoadScript googleMapsApiKey={process.env.mapAPI}>
      <Modal centered show={show} size='md' onHide={() => {setShow(!show); {page === 'history' && toggleModal();  onHistClick()}}}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView data={data} currentPage={page} revoke={revoke} address={address}/>
    </Modal>
    // </LoadScript>
    )
  } else {
    return (
      <Modal centered show={show} size='md' onHide={() => {setShow(!show)}}>
          <Modal.Header closeButton></Modal.Header>
          <ItemView data={data} currentPage={page} revoke={revoke} address={address}/>
      </Modal>
    )
  }

}

export default ItemModal