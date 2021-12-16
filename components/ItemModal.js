import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react'
import ItemView from './ItemView';

const ItemModal = ({ data, onHistClick, page, revoke, toggleModal }) => {
  const [show, setShow] = useState(true);

  return (
    <Modal centered show={show} size='md' onHide={() => {setShow(!show); toggleModal(); if (page === 'history') {onHistClick()}}}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView data={data} currentPage={page} revoke={revoke}/>
    </Modal>
  )
}

export default ItemModal