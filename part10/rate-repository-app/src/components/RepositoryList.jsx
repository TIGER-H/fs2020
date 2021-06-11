import React, { createContext, useContext, useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../hooks/useRepositories';
import RepositoryListItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    height: 50,
    paddingLeft: 10,
    fontSize: 20,
    margin: 5,
    borderRadius: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  method,
  changeMethod,
}) => {
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
      ListHeaderComponent={() => (
        <Picker
          style={styles.picker}
          selectedValue={method}
          onValueChange={(itemVal, _itemIdx) => changeMethod(itemVal)}
        >
          <Picker.Item label='Latest' value='latest' />
          <Picker.Item label='Highest rated' value='highest' />
          <Picker.Item label='Lowest rated' value='lowest' />
        </Picker>
      )}
      data={repositoryNodes}
      // ...
      ItemSeparatorComponent={ItemSeparator}
      renderItem={PressRepoItem}
    />
  );
};

const RepositoryList = () => {
  const [sortMethod, setSortMethod] = useState('latest');
  const { repositories } = useRepositories(sortMethod);

  const handleSortChange = (sort) => setSortMethod(sort);

  return (
    <View style={{ backgroundColor: '#eee' }}>
      <RepositoryListContainer
        repositories={repositories}
        method={sortMethod}
        changeMethod={handleSortChange}
      />
    </View>
  );
};

export default RepositoryList;
