import {useState} from 'react';
import Image from 'next/image';

const MapView = (props) => {
  const [list, setList] = useState(false);

  return (
    <div>
      <Image src='/MapViewPlaceHolder.png' width='640' height='780'/>
    </div>
  )
}

export default MapView;