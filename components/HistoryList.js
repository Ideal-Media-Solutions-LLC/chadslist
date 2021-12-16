import { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { Card, Container, Row, Col, Modal, Button, CloseButton, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import moment from 'moment';
import ItemView from './ItemView.js';
import ItemModal from './ItemModal.js';

const getHistory = (userId, histType) => {
  let urlStr;
  if (histType === 'donations') {
    urlStr = `http://localhost:3001/history/donations?userId=${userId}`;
  } else if (histType === 'claims') {
    urlStr = `http://localhost:3001/history/claims?userId=${userId}`;
  }

  return axios({
    method: 'get',
    url: urlStr,
    responseType: 'json'
  });
}

const HistListEntry = ( {item, histType, toggleModal} ) => {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState('');
  const {user} = useContext(AuthContext);
  console.log(item);
  let itemId = item.id;
  let revokeOption;
  if (histType == 'claims' && item.status == 'claimed') {
    revokeOption = 'Unclaim'
  }
  if (histType == 'donations' && item.status == 'unclaimed') {
    revokeOption = 'Delist'
  }

  const handleClick = () => {
    setShowModal(!showModal);
    toggleModal();
  }

  const updatePrice = (e) => {
    e.preventDefault();

    let value = Number(price);
    //send request to update the database
    // axios.put('http://localhost:3001/claim', {price: value, itemId: itemId})
    // .then(() => {
    //   alert('update price ok');
    //   setPrice('');
    // })
    // .catch(err => console.log(err));
    const input = {
      itemId: itemId,
      donorId: item.donorId,
      userId: user.id,
      condition: 'good',
      value: value
    }
    axios.post('http://localhost:3001/history/receipts', input)
    .then(() => {
      alert('update price ok');
      setPrice('');
    })
    .catch(err => console.log(err));

  }


  return (
    <div className='hist-list-item' id={item.id}>
      <img src={item.imageUrl} className='hist-list-item-img'/>
      <div className='hist-list-item-info'>
        <div className='hist-list-item-name' onClick={handleClick}>{item.name}</div>
        <div className='hist-list-item-status'>{(item.status).charAt(0).toUpperCase() + (item.status).slice(1)}</div>
        <div className='hist-list-item-date'>{moment(item.createdAt).format("MM/DD/YYYY")}</div>
        {(user && user.accType === 'charity' && histType === 'claims') && <form onSubmit={updatePrice} ><input onChange={(e) => setPrice(e.target.value)} type='number' value={price} placeholder=' Edit Value'/> <input type='submit' value='update'/></form>}
      </div>
      {!showModal ? null : <ItemModal data={item} onHistClick={handleClick.bind(this)} page='history' revoke={revokeOption} toggleModal={toggleModal}/>}
    </div>
  )
}

const HistoryList = ( { histType } ) => {
  // need to fix the userId later;
  const {user} = useContext(AuthContext);
  const userId = user.id;
  const [allHistItems, setAllHistItems] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [modalView, setModalView] = useState(false);

  const toggleModal = () => {
    setModalView(!modalView)
  }

  const handleSearch = (e) =>{
    let searchStr = e.target.value;
    if (searchStr.trim().length > 3) {
      setSearchTerm(searchStr);
    } else {
      setSearchTerm(null);
    }
  }

  useEffect(() => {
    getHistory(userId, histType)
    .then(res => {
      // console.log('what did server return', res.data);
      setAllHistItems(res.data);
      setDisplayedItems(res.data);
    })
    .catch(err => {
      console.log(`Error getting user history ${histType}`, err);
    })
  }, [userId, histType, modalView])

  useEffect(() => {
    if (displayedItems !== null) {
      if (searchTerm) {
        setDisplayedItems(allHistItems.filter((item) => {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
        }))
      } else {
        setDisplayedItems(allHistItems);
      }
    }
  }, [userId, searchTerm])

  // console.log('have modal open?', modalView);
  // console.log(displayedItems);
  return (
    <>
      <InputGroup id='hist-search'>
        <FormControl
          placeholder={`Search my ${histType}...`}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup>
      {histType === 'donations' && <Button className='btn' id='donation-receipt-btn' variant="primary">Print Receipt for Donations</Button>}
      <div id='hist-list'>
        {
          displayedItems &&
          displayedItems.map(item => {
            return <HistListEntry item={item} key={item.id} histType={histType} toggleModal={toggleModal.bind(this)}/>
          })
        }
      </div>
    </>
  )
}

export default HistoryList;