import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useAuthStorage from '../hooks/useAuthStorage';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const history = useHistory();
  const client = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
    history.push('/');
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default SignOut;
