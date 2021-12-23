import axios from 'axios';

const apiURL = 'http://localhost:3001'

export const autoLogin = () => {
  const token = localStorage.getItem('token');
  axios.get(`${apiURL}/auth/verify`, {
    headers: {
      'x-auth-token': token
    }
  })
  .then((result) => {
    return result.data
  })
  .catch((err) => {
    console.log(err);
  })
}
