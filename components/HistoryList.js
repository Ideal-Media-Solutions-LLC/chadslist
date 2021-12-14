import { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';

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

const HistListEntry = ( {item} ) => {
  return (
    <div className='hist-list-item' id={item.id}>
      <img src={item.imageUrl} />
      <div>
        <div>{item.name}</div>
        <div>{item.status}</div>
      </div>
    </div>
  )
}

const HistoryList = ( {histType, searchTerm} ) => {
  const userId = 40;
  const [allHistItems, setAllHistItems] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(null);

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
  }, [userId, histType])

  useEffect(() => {
    if (displayedItems !== null) {
      setDisplayedItems(displayedItems.filter((item) => {
        if (searchTerm && searchTerm.trim().length > 3) {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
        }
      }))
    }
  }, [userId])

  console.log(searchTerm);
  console.log(displayedItems);
  return (
    <div id='hist-list'>
      {
        displayedItems &&
        displayedItems.map(item => {
          return <HistListEntry item={item} key={item.id} />
        })
      }
    </div>
  )
}

export default HistoryList;