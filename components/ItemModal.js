import { Card, Container, Row, Col, Modal } from 'react-bootstrap';

const ItemModal = ({ data }) => {
  const { name, imageUrl, category, description, status, donorId } = data;
  return (
    <Modal centered show={true} size='md'>
        <Modal.Header closeButton></Modal.Header>
        <p>{name}</p>
        <img src={imageUrl} />
    </Modal>
  )
}

export default ItemModal