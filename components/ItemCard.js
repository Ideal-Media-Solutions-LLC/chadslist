import React from 'react';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import ItemModal from './ItemModal';

const ItemCard = ({ data }) => {
  const { name, imageUrl } = data;
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="card-tile-container" >
        <Card className="card-tile" onClick={() => setShow(!show)} style={{ width: '20rem' }}>
          <Card.Img variant="top" src={imageUrl} />
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