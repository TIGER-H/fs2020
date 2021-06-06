import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Constant from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: Constant.manifest.extra.APOLLO_URI,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
