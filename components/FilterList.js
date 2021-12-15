import { Nav, Navbar} from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css'
import Filter from './Filter';


const FilterList = ({handleFilter}) => {

  let filterList = [
    {
      category: 'Apparel',
      src: '/apparel_2.svg',
    },
    {
      category: 'Electronics',
      src: '/electronics_1.svg',
    },
    {
      category: 'Entertainment',
      src: '/entertainment.svg',
    },
    {
      category: 'Garden and Outdoor',
      src: '/gardening_1.svg',
    },
    {
      category: 'Hobbies',
      src: '/hobbies.svg',
    },
    {
      category: 'Home Goods',
      src: '/home_1.svg',
    },
    {
      category: 'Musical Instruments',
      src: '/instrument.svg',
    },
    {
      category: 'Office Supplies',
      src: '/office.svg',
    },
    {
      category: 'Pet Supplies',
      src: '/pets.svg',
    },
    {
      category: 'Sporting Goods',
      src: '/sports.svg',
    },
  ]

  return(
    <>
    <Image src='/Chads_list_2.svg' width='150' height='60' />
    <Nav defaultActiveKey="/" className="flex-column">
      <Navbar.Brand >Select Category</Navbar.Brand>
        {filterList.map((filter, index) => {
          return  <Filter key={index} filter={filter} handleFilter={handleFilter}/>
        })}
    </Nav>
    </>
  )
}

export default FilterList;