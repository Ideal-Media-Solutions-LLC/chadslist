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
        conversationId: action.payload.conversationId
      }
    case UPDATE_MESSAGES:
      return {
        ...state,
        savedMessages: [...state.savedMessages, action.payload]
      }
    case SET_MESSAGE_PAGE_LIST:
      return {
        ...state,
        messagePageList: [...state.messagePageList, action.payload]
      }
    default:
      return state
  }
}