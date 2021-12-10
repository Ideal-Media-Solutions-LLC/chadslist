import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER
} from '../types'

export default(state, action) => {
  switch(action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case LOGIN_USER:
        return {
          ...state,
          user: action.payload,
          loading: false
        }
    case LOGOUT_USER:
        return {
          ...state,
          user: action.payload,
          loading: false
        }
    default:
      return state
  }
}