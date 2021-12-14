import { useState } from 'react';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import ItemView from './Itemview.js';


const ListItem = ({ data }) => {

  const [item, setItem] = useState(false);

  const viewItem = () => setItem(true);
  const closeItem = () => setItem(false);

  return (
    <Col md={5}>
      <Card onClick={viewItem} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={data.img} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
        </Card.Body>
      </Card>

      <Modal centered show={item} size='md' onHide={closeItem}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView />
      </Modal>
    </Col>


  )
}

export default ListItem;