import AuthState from '../context/auth/AuthState';

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  )
}

export default MyApp
