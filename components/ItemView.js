import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { CgCloseO} from "react-icons/cg";

const ItemView = (props) => {
  const [map, setMap] = useState(false);

  return (
    <>
      <div>ItemView Here</div>
      <Card style={{ width: '18rem' }}>
        <CgCloseO />
        <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Price</Card.Text>
          <Card.Text>Location</Card.Text>
          <Button variant="primary">Claim</Button>
          <Button variant="primary">Message</Button>
          <Card.Text>
            Item's Detail
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default ItemView;