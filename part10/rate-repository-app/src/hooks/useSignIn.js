import { useApolloClient, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { GET_TOKEN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_TOKEN); // 提交账密以获得token
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { input: { username, password } },
    });
    const token = response.data.authorize.accessToken;

    await authStorage.setAccessToken(token);
    client.resetStore(); // 认证后重置存储 清空缓存 重新执行活跃的查询

    return response;
  };
  return [signIn, result];
};

export default useSignIn;
