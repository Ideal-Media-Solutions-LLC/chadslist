import React from 'react';
import { Pagination } from 'react-bootstrap';

const PageSelector = ({ itemsPerPage, itemsTotal, changePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(itemsTotal / itemsPerPage); i++) {

    if (i < 4 || (i = Math.ceil(itemsTotal / itemsPerPage))) {
      pageNumbers.push(<Pagination.Item onClick={() => changePage(i)} key={i}>
        {i}
      </Pagination.Item>);
    } else if (i === 4) {
      pageNumbers.push(<Pagination.Item onClick={() => changePage(i)} key={i}>
        {i}
      </Pagination.Item>);
      pageNumbers.push(<Pagination.Ellipsis />,);
    }

  }

  return (
    <>
      <div>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {pageNumbers}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </>
  )
}

export default PageSelector;