import { Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch} from "react-icons/fa";
import {useState} from 'react';

const Search = (props) => {
  let [searching, setSearching] = useState('');

  const handleSearch = (e) =>{
    setSearching(e.target.value)
  }

  return (
    <>
      <InputGroup>
        <FormControl
          placeholder="Recipient's username"
          value={searching}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup>
    </>
  )
}

export default Search;


