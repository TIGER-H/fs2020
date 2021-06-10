import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../hooks/useRepositories';
import RepositoryListItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes =
    repositories && repositories.edges
      ? repositories.edges.map((edge) => edge.node)
      : [];

  const PressRepoItem = ({ item }) => {
    const onPress = () => {
      history.push(`/repo/${item.id}`);
    };
    return (
      <Pressable onPress={onPress}>
        <RepositoryListItem item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      // ...
      ItemSeparatorComponent={ItemSeparator}
      renderItem={PressRepoItem}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  // console.log(repositories);

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
