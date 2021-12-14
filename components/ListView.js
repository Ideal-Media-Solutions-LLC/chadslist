import { useState, useContext } from 'react';
import Image from 'next/image';
import ItemView from './ItemView.js';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import ItemContext from '../context/item/ItemContext';
import ItemCard from './ItemCard.js';

const ListView = (props) => {
  const { itemList } = useContext(ItemContext);
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
          {itemList.map((item, index) =>
          (
            <ItemCard data={item}/>
          )
          )}
          {/* {item ? <Modal data={} centered show={item} size='md' onHide={closeItem}>
          <Modal.Header closeButton></Modal.Header>
            <ItemView />
          </Modal> : null } */}
          </Row>
      </Container>
    </div>
  )
}

export default ListView;