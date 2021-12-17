import {useState} from 'react';
import { Pagination } from 'react-bootstrap';

const PageSelector = ({ itemsPerPage, itemsTotal, changePage }) => {
  const pageNumbers = [];
  const [pageIndex, setPageIndex] = useState(0);

  for (let i = 1; i <= Math.ceil(itemsTotal / itemsPerPage); i++) {

    if (i < 4 || (i >= Math.ceil((itemsTotal / itemsPerPage - 1)))) {
      pageNumbers.push(<Pagination.Item onClick={() => {
        changePage(i);
        setPageIndex(i);
        }} key={i}>
        {i}
      </Pagination.Item>);
    } else if (i === 4) {
      pageNumbers.push(<Pagination.Item onClick={() => {
        changePage(i);
        setPageIndex(i);
        }} key={i}>
        {i}
      </Pagination.Item>);
      pageNumbers.push(<Pagination.Ellipsis />,);
    }

  }

  return (
    <>
      <div className="pagination">
        <Pagination>
          <Pagination.First onClick={() => {
            changePage(1);
            setPageIndex(1);
            }} />
          <Pagination.Prev onClick={() => {
            changePage(pageIndex - 1);
            setPageIndex(pageIndex - 1);
            }} />
          {pageNumbers}
          <Pagination.Next onClick={() => {
            changePage(pageIndex + 1);
            setPageIndex(pageIndex + 1);
            }}/>
          <Pagination.Last onClick={() => {
            changePage(pageNumbers.length -1);
            setPageIndex(pageNumbers.length -1);
            }}/>
        </Pagination>
      </div>
    </>
  )
}

export default PageSelector;