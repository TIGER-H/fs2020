import { useApolloClient, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { GET_TOKEN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(GET_TOKEN);

  const SignIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username: username,
        password: password,
      },
    });
    if (response.data) {
      const token = response.data.authorize.accessToken;
      console.log('token: ', token);

      await authStorage.setAccessToken(token);
      client.resetStore();

      return true;
    }
    return false;
  };
  return [SignIn, result];
};

export default useSignIn;
