import {useState} from 'react';
import Image from 'next/image';

const ListView = (props) => {
  const [map, setMap] = useState(false);

  return (
    <div>
      <Image src='/ListViewPlaceHolder.png' width='640' height='780'/>

    </div>
  )
}

export default ListView;