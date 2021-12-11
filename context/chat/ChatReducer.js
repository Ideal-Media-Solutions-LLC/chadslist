import {
  GET_MESSAGES
} from '../types';

export default(state, action) => {
  switch(action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        savedMessages: action.payload
      }
    default:
      return state
  }
}