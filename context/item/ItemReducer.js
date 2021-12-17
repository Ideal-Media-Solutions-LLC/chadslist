import {
  SET_ITEM_LIST
} from '../types';

export default (state, action) => {
  switch (action.type) {
  case SET_ITEM_LIST:
    return {
      ...state,
      itemList: action.payload.data,
      currentLocation: {lat: action.payload.lat, lng: action.payload.lng}
    };
  default:
    return state;
  }
};