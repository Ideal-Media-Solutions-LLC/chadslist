import { Card, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useState } from 'react';
import ItemModal from './ItemModal';
import ItemView from './ItemView';
import { Heart } from '../Public/heart.svg';
import axios from 'axios';

const ItemCard = ({ data }) => {
  const { name, imageUrl } = data;
  const [show, setShow] = useState(false);

  const imageVerification = (e) => {
    e.target.onerror = null;
    e.target.src = '/alt.png';
  };

  return (
    <>
      <div className="card-tile-container" >
        <Card className="card-tile" onClick={() => setShow(!show)} style={{ width: '20rem' }}>
          <Card.Img src={imageUrl} onError={imageVerification} variant="top" />
          {/* { imageUrl ? <Card.Img variant="top" src={imageUrl} /> : <Card.Img variant="top" src="/heart.svg"/> } */}
          <Card.Body>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
      {!show ? null : <ItemModal data={data} page='main'/>}
    </>
  );
};

export default ItemCard;