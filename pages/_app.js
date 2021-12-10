import AuthState from '../context/auth/AuthState';
import Navbar from '../components/NaviBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <Navbar />
      <Component {...pageProps} />
    </AuthState>
  )
}

export default MyApp
