import { Card, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useState } from 'react';
import ItemModal from './ItemModal';
import ItemView from './ItemView';

const ItemCard = ({ data }) => {
  const { name, imageUrl } = data;
  const [show, setShow] = useState(false);

  return (
    <>
      <Col key="1" md={5}>
        <Card onClick={() => setShow(!show)} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={imageUrl} alt='Image Loading'/>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      {!show ? null : <ItemModal data={data} page='main'/>}
    </>
  )
}

export default ItemCard;