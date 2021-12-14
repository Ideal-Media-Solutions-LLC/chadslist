import React from 'react';
import { Pagination } from 'react-bootstrap';

const PageSelector = ({itemsPerPage, itemsTotal, changePage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(itemsTotal / itemsPerPage); i++) {
    pageNumbers.push(<Pagination.Item onClick={ () => changePage(i) } key={i}>
      {i}
    </Pagination.Item>,);
  }

  return (
    <>
      <div>
        <Pagination>{pageNumbers}</Pagination>
      </div>
    </>
  )
}

export default PageSelector;