import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);
  const client = useApolloClient();

  const signUp = async ({ username, password }) => {
    const response = await mutate({
      variables: { input: { username: username, password: password } },
    });
    client.resetStore();
    return response;
  };

  return [signUp, result];
};

export default useSignUp;
