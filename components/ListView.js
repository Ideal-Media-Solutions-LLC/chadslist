import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemCard from './ItemCard.js';

const ListView = ({viewableItems}) => {

  return (
    <div>
      <Container className="list-container">
        <Row sm={4} md={4}>
          {viewableItems.map((item) =>
            (
              <ItemCard key={item.id} data={item}/>
            )
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ListView;