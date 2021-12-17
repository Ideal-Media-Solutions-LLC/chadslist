import { Button, Offcanvas, Nav, Navbar, Row, Col, Container } from 'react-bootstrap';
import NaviBar from '../../components/NaviBar.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/AuthContext';
import { jsPDF } from "jspdf";
import Avatar from '@mui/material/Avatar';
// import HistoryList from '../../components/HistoryList.js';
const Receipts = (props) => {

  const doc = new jsPDF();

  const [showNavi, setNavi] = useState(false);
  const naviShow = () => setNavi(!showNavi);
  const closeNavi = () => setNavi(false);

  const { user } = useContext(AuthContext);
  const [receipt, setReceipt] = useState([]);

  const getReceipt = () => {
    axios.get(`http://localhost:3001/history/receipts?donorId=${user.id}`)
      .then((data) => {
        console.log(data.data);
        setReceipt(data.data)
      })
      .catch(err => console.log(err));
  }

  useEffect(getReceipt, []);

  const downloadClick = () => {
    const element = document.getElementById('receipt')
    doc.html(element)
    .then(() => {
      doc.setFontSize(16);
      doc.save('receipt.pdf')
    });
  }

  const total = () => {
    const sum = 0;
    receipt.forEach((item) => sum += item.value);
    return sum;
  }

  return (
    <Container>
   <Row className="header">
            <Col>
              <img className="home-page-logo" src='/Chads_list_2.svg' width='230' height='100' />
            </Col>
            <Col className="home-page-buttons">
              {user ? <div className="avatar-header-row" onClick={naviShow}>
                <Avatar alt="Travis Howard" src={user.photoUrl} style={{ height: '35px', width: '35px', marginRight: '8px' }}/>
                <div style={{ marginTop: '12px', fontWeight: 'bold', display: 'flex', flexWrap: 'wrap' }}>
                {/* <p>{user.userName}</p> */}
                </div>
              </div> :   <img id="hamburger-menu-home-page" onClick={naviShow} src='/dropdown_menu.svg' width='50' height='50' /> }

              <Offcanvas placement='end' show={showNavi} onHide={closeNavi} >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <NaviBar close={closeNavi}/>
              </Offcanvas>
            </Col>
        </Row>
      <Button onClick={downloadClick}>download</Button>
      <div id='receipt'>
        <h2 className='page-title'>My Receipts</h2>
        <div><p>Username: {user.userName}</p></div>
        {receipt.map((item, index) =>
          <div key={index}>
            <p>ItemId: {item.itemId}</p>
            <p>Item: {item.name}</p>
            <p>Date: {item.createdAt}</p>
            <p>Value: ${item.value}</p>
          </div>
        )}
        <div><p>Total Donation Value: ${total()}</p></div>
      </div>
    </Container>
  )
}

export default Receipts;