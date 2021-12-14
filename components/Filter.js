import { Nav, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useContext } from 'react';
import ItemContext from '../context/item/ItemContext';

const Filter = ({filter, handleFilter}) => {
  const { itemList } = useContext(ItemContext);


  return (
    <>
      <InputGroup>
        <Image src={filter.src} width='40' height='40' />
        <Nav.Link onClick={() =>handleFilter(filter.category)}>{filter.category}</Nav.Link>
      </InputGroup>
    </>
  )
}

export default Filter;

