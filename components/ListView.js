import { useState } from 'react';
import Image from 'next/image';
import ItemView from './ItemView.js';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';

const ListView = (props) => {
  const [map, setMap] = useState(false);
  const [item, setItem] = useState(false);

  // dummy data to show List
  const [list, setList] = useState([
    { name: 'item', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
  ]);

  const viewItem = () => setItem(true);
  const closeItem = () => setItem(false);


  return (
    <div>
      <Container>
        <Row sm={4} md={4}>
          {list.map((item, index) => <Col key={index} md={5}>
            <Card onClick={viewItem} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>)}
        </Row>
      </Container>
      <Modal centered show={item} size='md' onHide={closeItem}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView />
      </Modal>
    </div>
  )
}

export default ListView;