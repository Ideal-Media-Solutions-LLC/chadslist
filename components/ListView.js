import { useState, useContext } from 'react';
import Image from 'next/image';
import ItemView from './ItemView.js';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import ItemContext from '../context/item/ItemContext';
import ItemCard from './ItemCard.js';

const ListView = (props) => {
  const { itemList } = useContext(ItemContext);


  return (
    <div>
      <Container className="list-container">
      <Row sm={4} md={4}>
          {itemList.map((item, index) =>
          (
            <ItemCard key={item.id} data={item}/>
          )
          )}
          </Row>
      </Container>
    </div>
  )
}

export default ListView;