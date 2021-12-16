import {
  GET_MESSAGES,
  UPDATE_MESSAGES,
  SET_MESSAGE_PAGE_LIST,
  CLEAR_SAVED_MESSAGES,
  SET_LOADING,
  ADD_MESSAGE
} from '../types';

export default(state, action) => {
  switch(action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        savedMessages: action.payload.data,
        conversationId: action.payload.conversationId,
        loading: true
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
      }
    case CLEAR_SAVED_MESSAGES:
        return {
          ...state,
          savedMessages: action.payload
      }
    case SET_LOADING:
        return {
          ...state,
          loading: !state.loading
      }
    case ADD_MESSAGE:
        return {
          ...state,
          savedMessages: [...state.savedMessages, action.payload]
      }
    default:
      return state
  }
}