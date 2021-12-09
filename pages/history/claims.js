import { Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch} from "react-icons/fa";
import {useState} from 'react';

const Claims = (props) => {
  let [searching, setSearching] = useState('');

  const handleSearch = (e) =>{
    setSearching(e.target.value)
  }

  return (
    <>
      <div>My Claims</div>
      <InputGroup>
        <FormControl
          placeholder="Search my claims..."
          value={searching}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup>
      <div>List of Claims Here</div>
    </>
  )
}

export default Claims;