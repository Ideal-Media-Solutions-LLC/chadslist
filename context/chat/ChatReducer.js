import {
  GET_MESSAGES,
  UPDATE_MESSAGES,
  SET_CONVERSATION
} from '../types';

export default(state, action) => {
  switch(action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        savedMessages: action.payload
      }
    case UPDATE_MESSAGES:
      return {
        ...state,
        savedMessages: [...state.savedMessages, action.payload]
      }
    case SET_CONVERSATION:
      return {
        ...state,
        conversationId: action.payload
      }
    default:
      return state
  }
}