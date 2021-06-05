import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Constant from 'expo-constants';

const httpLink = createHttpLink({
  uri: Constant.manifest.extra.APOLLO_URI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
