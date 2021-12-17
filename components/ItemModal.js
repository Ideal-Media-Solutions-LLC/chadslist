import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import ItemView from './ItemView';

const ItemModal = ({ data, onHistClick, page, revoke, toggleModal }) => {
  const [show, setShow] = useState(true);


  if (page === 'history') {
    return (
      <Modal centered show={show} size='md' onHide={() => { setShow(!show); { page === 'history' && toggleModal(); onHistClick(); } }}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView data={data} currentPage={page} revoke={revoke}/>
      </Modal>
    );
  } else {
    return (
      <Modal centered show={show} size='md' onHide={() => { setShow(!show); }}>
        <Modal.Header closeButton></Modal.Header>
        <ItemView data={data} currentPage={page} revoke={revoke}/>
      </Modal>
    );
  }

};

export default ItemModal;