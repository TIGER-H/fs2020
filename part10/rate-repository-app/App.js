import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/main';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};
export default App;
