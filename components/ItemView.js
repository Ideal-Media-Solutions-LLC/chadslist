import { Button, Card, CloseButton, Modal } from 'react-bootstrap';
import MessageView from './MessageView.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ItemContext from '../context/item/ItemContext';
import ChatContext from '../context/chat/ChatContext';
import AuthContext from '../context/auth/AuthContext';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3200");

const ItemView = ({ data, currentPage, revoke }) => {
  const { id, name, imageUrl, category, description, status, donorId } = data;
  const { getMessages, conversationId } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const {item} = useContext(ItemContext);
  const [Message, setMessage] = useState (false);
  const showMessage = () => setMessage(true);
  const closeMessage = () => setMessage(false);
  const [isClaim, setIsClaim] = useState(false);
  const [histClaim, setHistClaim] = useState(true);
  const [histList, setHistList] = useState(true);
  const [page, setPage] = useState(currentPage);
  const [address, setAddress] = useState('')

  const handleHistClaim = (e) => {
    axios.put(`http://localhost:3001/history/claims?itemId=${id}`)
        .then(res => {
          setHistClaim(false)
        })
        .catch(err => {
          console.log('unclaim err', err)
        })
  }

  const handleHistList = (e) => {
    axios.delete(`http://localhost:3001/history/donations?itemId=${id}`)
    .then(res => {
      setHistList(false)
    })
    .catch(err => {
      console.log('delist err', err)
    })
  }

  const handleClaimClick = () => {

    axios.post('http://localhost:3001/claim', {
      claimantId: user.id,
      itemId: data.id,
    })
    .then(() => console.log('claim success'))
    .catch(err => console.log('claim err', err));

    setIsClaim(!isClaim)
  }

    const joinRoom = () => {


      socket.emit("join_chat", conversationId)
    }


  /*
  Converts location coordinates to Human Readable address string
  Results may include a Google 'Plus Code' due to the mock data point
  locations of items being in places that have no proper address.
  */
  const geocoder = new google.maps.Geocoder();

  useEffect( () => {
    geocoder.geocode({location: {
      lat: data.latitude,
      lng: data.longitude
    }})
    .then( response => {
      console.log(response)
      if (response.results[1]) {
       setAddress(response.results[1].formatted_address)
      }
    })}, [data])


  console.log(data);
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={imageUrl} style={{ objectFit: 'cover', height: '40vh'}}/>
        <Card.Body>

          <div className="card-button-row">
          {
            page !== 'history' &&
            <Button style={{ marginRight: '10px'}} variant={isClaim? "secondary":"primary"} onClick={handleClaimClick}>{isClaim? "Unclaim":"Claim"}</Button>}
          {
            page !== 'history' &&
            <Button onClick={() => {
              showMessage();
              joinRoom();
              getMessages(user.id, donorId, id);
              }} variant="primary">Message</Button>
          }
          </div>

          <div className="card-modal-description">
          <Card.Title>{name}</Card.Title>
            {/* <Card.Text>Value</Card.Text> */}
            {/* <Card.Text>Location</Card.Text> */}
          {
            (revoke === 'Unclaim' && histClaim) &&
            <Button variant="primary" onClick={handleHistClaim}>Unclaim</Button>
          }

          {
            !histClaim &&
            <Button variant="secondary" disabled>
              Unclaim
            </Button>
          }

          {
            (revoke === 'Delist' && histList) &&
            <Button variant="primary" onClick={handleHistList}>Delist</Button>
          }

          {
            !histList &&
            <Button variant="secondary" disabled>Delist</Button>
          }
          <Card.Text style={{ color: 'darkgrey'}}>
            {address}
          </Card.Text>
          <Card.Text>
            {description}
          </Card.Text>
          </div>
        </Card.Body>
      </Card>

      <Modal centered show={Message} fullscreen={true} onHide={closeMessage} >
        <Modal.Header closeButton>Chat</Modal.Header>
        {!user ? null : <MessageView sender={user.id} receiver={donorId} id={conversationId} socket={socket}/> }
      </Modal>
    </>
  )
}

export default ItemView;
