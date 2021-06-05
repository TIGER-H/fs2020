import { useMutation } from '@apollo/client';
import { GET_TOKEN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_TOKEN);

  const SignIn = async ({ username, password }) => {
    mutate({
      variables: {
        username: username,
        password: password,
      },
    });
  };
  return [SignIn, result];
};

export default useSignIn;
