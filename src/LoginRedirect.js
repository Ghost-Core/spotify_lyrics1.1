import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccessToken } from '../utils/api';

function LoginRedirect() {
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const state = queryParams.get('state');
    if (code && state) {
      if (state !== localStorage.getItem('auth_state')) {
        setError('Invalid state. Please try logging in again.');
      } else {
        getAccessToken(code).then((accessToken) => {
          localStorage.setItem('access_token', accessToken);
          window.location.replace('/currently-playing');
        });
      }
    } else {
      setError('Invalid response. Please try logging in again.');
    }
  }, [location]);

  return <p>{error}</p>;
}

export default LoginRedirect;
