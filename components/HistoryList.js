import { useState, useEffect, useContext } from 'react';
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

const HistListEntry = ( {item, histType} ) => {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState('');
  const {user} = useContext(AuthContext);
  let revokeOption;
  if (histType == 'claims' && item.status == 'claimed') {
    revokeOption = 'Unclaim'
  }
  if (histType == 'donations' && item.status == 'unclaimed') {
    revokeOption = 'Delist'
  }

  const handleClick = () => {
    setShowModal(!showModal);
  }

  const updatePrice = (e) => {
    e.preventDefault();

    if (Number(price) === 'NaN') {
      alert('invalid price');

    }
    //send request to update the database
  }


  return (
    <div className='hist-list-item' id={item.id}>
      <img src={item.imageUrl} className='hist-list-item-img'/>
      <div className='hist-list-item-info'>
        <div onClick={handleClick}>{item.name}</div>
        <div>{(item.status).charAt(0).toUpperCase() + (item.status).slice(1)}</div>
        {(user.accType === 'charity') && <form onSubmit={updatePrice} ><input onChange={(e) => setPrice(e.target.value)} type='text' placeholder=' Edit Value'/> <input type='submit' value='submit'/></form>}
        <div>{moment(item.createdAt).format("MM/DD/YYYY")}</div>
      </div>
      {!showModal ? null : <ItemModal data={item} onHistClick={handleClick.bind(this)} page='history' revoke={revokeOption}/>}
    </div>
  )
}

const HistoryList = ( { histType } ) => {
  const userId = 40;
  const [allHistItems, setAllHistItems] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

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
      console.log('what did server return', res.data);
      setAllHistItems(res.data);
      setDisplayedItems(res.data);
    })
    .catch(err => {
      console.log(`Error getting user history ${histType}`, err);
    })
  }, [userId, histType])

  useEffect(() => {
    if (displayedItems !== null) {
      if (searchTerm) {
        setDisplayedItems(displayedItems.filter((item) => {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
        }))
      } else {
        setDisplayedItems(allHistItems);
      }
    }
  }, [userId, searchTerm])

  // console.log(searchTerm);
  // console.log(displayedItems);
  return (
    <>
      <InputGroup id='hist-search'>
        <FormControl
          placeholder="Search my claims..."
          onChange={handleSearch}
        />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup>
      {histType === 'donations' && <Button variant="primary">Print Receipt for Donations</Button>}
      <div id='hist-list'>
        {
          displayedItems &&
          displayedItems.map(item => {
            return <HistListEntry item={item} key={item.id} histType={histType}/>
          })
        }
      </div>
    </>
  )
}

export default HistoryList;