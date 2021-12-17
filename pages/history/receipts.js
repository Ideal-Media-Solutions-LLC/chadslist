import React from 'react';
import { Offcanvas, Row, Col, Container } from 'react-bootstrap';
import NaviBar from '../../components/NaviBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/AuthContext';
// import HistoryList from '../../components/HistoryList.js';

const Receipts = () => {

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  const {user} = useContext(AuthContext);
  const [receipt, setReceipt] = useState(null);

  const getReceipt = () => {
    axios.get(`http://localhost:3001/history/receipts?donorId=${user.id}`)
      .then((data) => {
        console.log(data.data);
        setReceipt(data.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(getReceipt, []);

  // const total = () => {
  //   const sum = 0;
  //   console.log(receipt, 'receipt')
  //   return sum;
  // }
  // console.log(total())

  return (
    <Container>
      <Row className="header">
        <Col>
          <img className="home-page-logo" src='/Chads_list_2.svg' width='300' height='100' />
        </Col>
        <Col className="home-page-buttons">
          <img id="hamburger-menu-home-page" onClick={naviShow} src='/dropdown_menu.svg' width='50' height='50' />
          <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <NaviBar close={closeNavi}/>
          </Offcanvas>
        </Col>
      </Row>
      <h2 className='page-title'>My Receipts</h2>
      <div><p>Username: {user.userName}</p></div>
      {receipt.map((item) =>
        <div key={item.id}>
          <p>ItemId: {item.itemId}</p>
          <p>Value: {item.value}</p>
        </div>
      )}
    </Container>
  );
};

export default Receipts;