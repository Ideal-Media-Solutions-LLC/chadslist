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
    user: null,
    loading: true
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const router = useRouter();

  useEffect(() => {
    autoLogin();
  }, [])

  const registerUser = async (form) => {
    console.log(form)
      const { userName, email, password, photoUrl, accType } = form
      axios.post(`${apiURL}/auth/register`, {
        userName,
        email,
        password,
        photoUrl,
        accType
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

  const loginUser = (form) => {
    const { email, password } = form
    axios.post(`${apiURL}/auth/login`, {
      email,
      password
    })
    .then((result) => {

      dispatch({
        type: LOGIN_USER,
        payload: result.data
      })
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch({
      type: LOGOUT_USER,
      payload: null
    })
  }

  const autoLogin = () => {
    const token = localStorage.getItem('token');
    axios.get(`${apiURL}/auth/verify`, {
      headers: {
        'x-auth-token': token
      }
    })
    .then((result) => {
      dispatch({
        type: LOGIN_USER,
        payload: result.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, registerUser, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState