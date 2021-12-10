import { useState } from 'react';
import Image from 'next/image';
import ItemView from './ItemView.js';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';

const ListView = (props) => {
  const [map, setMap] = useState(false);
  const [item, setItem] = useState(false);

  // dummy data to show List
  const [list, setList] = useState([
    { name: 'item', img: '/apparel_2.svg' },
    { name: 'item', img: '/apparel_2.svg' },
    { name: 'item', img: '/apparel_2.svg' },
    { name: 'item', img: '/apparel_2.svg' },
    { name: 'item', img: '/apparel_2.svg' },
    { name: 'item', img: '/apparel_2.svg' },
  ]);

  const viewItem = () => setItem(true);
  const closeItem = () => setItem(false);


  return (
    <div>
      <Container>
        <Row sm={4} md={4}>
          {list.map((item, index) => <Col md={4}>
            <Card onClick={viewItem} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>)}
        </Row>
      </Container>

      <Modal show={item} fullscreen={true} onHide={closeItem}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        {/* <ItemView /> */}
      </Modal>
    </div>
  )
}

export default ListView;