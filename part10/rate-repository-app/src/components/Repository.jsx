import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import RepositoryListItem from './RepositoryItem';
import Text from './Text';
// import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  submit: {
    margin: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: theme.colors.appBarText,
  },
});

const Repository = () => {
  const { id } = useParams();
  const { data, loading } = useRepository(id);
  if (loading) return <Text>waiting for loading</Text>;

  const onPress = () => {
    Linking.openURL(data.repository.url);
    // WebBrowser.openBrowserAsync(data.repository.url);
  };

  return (
    <View>
      <RepositoryListItem item={data.repository} />
      <View>
        <Pressable onPress={onPress} style={styles.submit}>
          <Text style={styles.text}>Open in Github</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Repository;
