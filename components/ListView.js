import { useState, useContext } from 'react';
import Image from 'next/image';
import ItemView from './ItemView.js';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import ItemContext from '../context/item/ItemContext';
import ItemCard from './ItemCard.js';

const ListView = (props) => {
  const { itemList } = useContext(ItemContext);
<<<<<<< HEAD
=======
  const [map, setMap] = useState(false);
  const [item, setItem] = useState(false);

  // dummy data to show List
  const [list, setList] = useState([]);

  const viewItem = () => setItem(true);
  const closeItem = () => setItem(false);

>>>>>>> 10cb7206710a90deb9b91ad8ad1fa1170a6785e0


  return (
    <div>
      <Container>
      <Row sm={4} md={4}>
          {props.viewableItems.map((item, index) =>
          (
            <ItemCard data={item}/>
          )
          )}
          </Row>
      </Container>
    </div>
  )
}

export default ListView;