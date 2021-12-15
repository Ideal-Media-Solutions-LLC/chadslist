import {
  GET_MESSAGES,
  UPDATE_MESSAGES,
  SET_MESSAGE_PAGE_LIST
} from '../types';

export default(state, action) => {
  switch(action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        savedMessages: action.payload.data,
        conversationId: action.payload.conversationId,
        loading: false
      }
    case UPDATE_MESSAGES:
      return {
        ...state,
        savedMessages: [...state.savedMessages, action.payload]
      }
    case SET_MESSAGE_PAGE_LIST:
      return {
        ...state,
        messagePageList: action.payload,
        loading: false
      }
    default:
      return state
  }
}