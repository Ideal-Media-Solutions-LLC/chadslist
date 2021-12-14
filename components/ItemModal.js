import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react'
import ItemView from './ItemView';

const ItemModal = ({ data }) => {
  const [show, setShow] = useState(true);

  return (
    <Modal centered show={show} size='md' onHide={() => setShow(!show)}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView data={data} />
    </Modal>
  )
}

export default ItemModal