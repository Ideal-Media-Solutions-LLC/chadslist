import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react'

const ItemModal = ({ data }) => {
  const [show, setShow] = useState(true);
  const { name, imageUrl, category, description, status, donorId } = data;
  return (
    <Modal centered show={show} size='md' onHide={() => setShow(!show)}>
        <Modal.Header closeButton></Modal.Header>
        <p>{name}</p>
        <img src={imageUrl} />
    </Modal>
  )
}

export default ItemModal