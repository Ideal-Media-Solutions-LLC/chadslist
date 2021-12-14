import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react'
import ItemView from './ItemView';

const ItemModal = ({ data, onHistClick, page }) => {
  const [show, setShow] = useState(true);

  return (
    <Modal centered show={show} size='md' onHide={() => {setShow(!show); if (page === 'history') {onHistClick()}}}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView data={data} currentPage={page}/>
    </Modal>
  )
}

export default ItemModal