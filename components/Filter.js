import React from 'react';
import { Nav, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filter = ({filter, categoryFilter, close, setFilterTag}) => {

  return (
    <>
      <InputGroup>
        <Image src={filter.src} width='40' height='40' />
        <Nav.Link onClick={() =>{
          categoryFilter(filter.category);
          setFilterTag(filter.category);
          close();
        }}>{filter.category}</Nav.Link>
      </InputGroup>
    </>
  );
};

export default Filter;

