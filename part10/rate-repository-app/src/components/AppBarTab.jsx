import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarText,
    padding: 14,
    fontSize: 20,
  },
});

const AppBarTab = ({ name, url }) => {
  return (
    <Pressable>
      <Link to={url}>
        <Text style={styles.text}>{name}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
