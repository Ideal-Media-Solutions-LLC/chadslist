import { useState, useContext } from 'react';
import Image from 'next/image';
import ItemView from './ItemView.js';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import ItemContext from '../context/item/ItemContext';
import ItemCard from './ItemCard.js';
import PageSelector from './PageSelector.js';

const ListView = (props) => {
  const { itemList } = useContext(ItemContext);
  const [map, setMap] = useState(false);
  const [item, setItem] = useState(false);

  // dummy data to show List
  const [list, setList] = useState([
    { name: 'item1', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item2', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item3', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item4', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item5', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item6', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item7', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item8', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item9', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item10', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item11', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item12', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item13', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" },
    { name: 'item14', imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/1280px-Gull_portrait_ca_usa.jpg" }
  ]);

  const viewItem = () => setItem(true);
  const closeItem = () => setItem(false);

  // ~~~~~~~~~~~~~~~~ Pagination ~~~~~~~~~~~~~~~~~~~~~~

  // current page of posts being viewed, default 1
  const [page, setPage] = useState(1);

  // how many items per page being viewed, default 8
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // formula for determining which items should be viewable based on current page and number of itemsPerPage
  const viewableItems = list.slice((page * itemsPerPage) - itemsPerPage, page * itemsPerPage);

  const changePage = number => setPage(number);

  // ~~~~~~~~~~~~~~~ Pagination End ~~~~~~~~~~~~~~~~~~~~


  return (
    <div>
      <Container>
      <Row sm={4} md={4}>
          {viewableItems.map((item, index) =>
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
      <PageSelector itemsPerPage={itemsPerPage} itemsTotal={list.length} changePage={changePage}/>
    </div>
  )
}

export default ListView;