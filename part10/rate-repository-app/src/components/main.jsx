import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Redirect, Route, Switch } from 'react-router-native';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Repository from './Repository';
import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/signout'>
          <SignOut />
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/repo/:id' exact>
          <Repository />
        </Route>
        <Route path='/createReview' exact>
          <CreateReview />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;
