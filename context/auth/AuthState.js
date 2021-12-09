import React, { useReducer, useEffect } from 'react'
import AuthContext from './AuthContext.js'
import AuthReducer from './AuthReducer.js'
import { useRouter } from 'next/router';
import axios from 'axios';

const apiURL = 'http://localhost:3001';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER
} from '../types';

const AuthState = (props) => {
  const initialState = {
    user: {},
    loading: true
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const router = useRouter();

  const registerUser = async (email, password, username, status) => {

      axios.post(`${apiURL}/auth/register`, {
        username,
        email,
        password,
        status
      })
      .then((result) => {
        // store token in memory instead of localstorage or cookies much more secure to XSS attacks
        //set  as HTTP only cookie can't be accessed by javascript
        // can't store in memory or use cookies when making cross origin requests
        localStorage.setItem('token', result.data.accessToken)

        dispatch({
          type: REGISTER_USER,
          payload: result.data
        })
        router.push('/')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const loginUser = (email, password) => {

  }

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
      payload: null
    })
  }



  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, registerUser, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState