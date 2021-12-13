import ItemContext from './ItemContext';
import ItemReducer from './ItemReducer';
import { useReducer, useEffect } from 'react';

const ItemState = (props) => {
  const initialState = {
    itemList: [],
    currentLocation: {}
  }

  // useEffect(() => {
  //   getItemsInRadius(coordinates);
  // }, [currentLocation])

  const [state, dispatch] = useReducer(ItemReducer, initialState)

  const getItemsInRadius = (lat, lng) => {
    console.log(lat, lng, 'context')
  }

  return (
    <ItemContext.Provider value={{ itemList: state.itemList, currentLocation: state.currentLocation, getItemsInRadius }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemState