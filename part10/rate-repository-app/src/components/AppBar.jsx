import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { GET_AUTH_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.appBarText,
    padding: 14,
  },
  // ...
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'network-only',
  });
  const loggedin = data && data.authorizedUser ? data.authorizedUser : null;
  // console.log(loggedin);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name={'Repositories'} url='/' />
        {!loggedin && <AppBarTab name={'Sign in'} url='/signin' />}
        {loggedin && <AppBarTab name={'Sign Out'} url='/signout' />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
