import ItemContext from './ItemContext';
import ItemReducer from './ItemReducer';
import { useReducer, useEffect, useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import axios from 'axios';

import {
  SET_ITEM_LIST
} from '../types';

const API_URL = 'http://localhost:3001/items'

const ItemState = (props) => {
  const initialState = {
    itemList: [],
    currentLocation: {}
  }

  // useEffect(() => {
  //   getItemsInRadius(coordinates);
  // }, [currentLocation])
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(ItemReducer, initialState)

  const getItemsInRadius = (lat = 10, lng = 10) => {
    // FOR LATER: need to have dynamic input for radius for user

    // axios.get(`${API_URL}/?userId=${user.id}&radius=10&latitude=${lat}&longitude=${lng}`)

    axios.get(`${API_URL}/?radius=10&latitude=${lat}&longitude=${lng}`)
    .then((result) => {
      const newObj = {
        data: result.data,
        lat: lat,
        lng: lng
      }
      dispatch({
        type: SET_ITEM_LIST,
        payload: newObj
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const createItem = (form, callback) => {
    const { itemName, category, description, images } = form

    const coordinates = {
      lat: state.currentLocation.lat,
      lng: state.currentLocation.lng
    }

    console.log(user.id)
    axios.post(API_URL, {
      donorId: user.id,
      itemName,
      category,
      description,
      images,
      coordinates
    })
    .then((result) => {
      console.log(result);
      callback();
    })
    .catch((err) => {
      console.log(err)
      alert('Unable to post');
    })

  }

  return (
    <ItemContext.Provider value={{ itemList: state.itemList, currentLocation: state.currentLocation, getItemsInRadius, createItem }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemState