import {
  SET_ITEM_LIST,
  FILTER_ITEMS
} from '../types'

export default(state, action) => {
  switch(action.type) {
    case SET_ITEM_LIST:
      return {
        ...state,
        itemList: action.payload.data,
        currentLocation: {lat: action.payload.lat, lng: action.payload.lng}
      }
    case FILTER_ITEMS:
        return {
          ...state,
          itemList: state.itemList.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
        }
    default:
      return state
  }
}