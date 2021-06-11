import React, { createContext, useContext, useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../hooks/useRepositories';
import RepositoryListItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    height: 50,
    paddingLeft: 10,
    fontSize: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    // ...
    return (
      <View>
        <Searchbar
          style={{ marginTop: 5 }}
          placeholder='Search'
          onChangeText={props.searchBarOnChange}
          value={props.searchBarText}
        />
        <Picker
          style={styles.picker}
          selectedValue={props.method}
          onValueChange={(itemVal, _itemIdx) => props.changeMethod(itemVal)}
        >
          <Picker.Item label='Latest' value='latest' />
          <Picker.Item label='Highest rated' value='highest' />
          <Picker.Item label='Lowest rated' value='lowest' />
        </Picker>
      </View>
    );
  };

  render() {
    const props = this.props;
    const repositoryNodes =
      props.repositories && props.repositories.edges
        ? props.repositories.edges.map((edge) => edge.node)
        : [];

    const PressRepoItem = ({ item }) => {
      const onPress = () => {
        props.history.push(`/repo/${item.id}`);
      };

      return (
        <Pressable onPress={onPress}>
          <RepositoryListItem item={item} />
        </Pressable>
      );
    };

    return (
      <FlatList
        // ...
        ListHeaderComponent={this.renderHeader}
        data={repositoryNodes}
        // ...
        ItemSeparatorComponent={ItemSeparator}
        renderItem={PressRepoItem}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortMethod, setSortMethod] = useState('latest');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchQueryDebounced] = useDebounce(searchQuery, 50);
  const { repositories } = useRepositories(sortMethod, searchQueryDebounced);
  const history = useHistory();

  // console.log(searchQuery); // lost focus! check 10.24

  const onChangeSearch = (query) => setSearchQuery(query);
  const handleSortChange = (sort) => setSortMethod(sort);

  return (
    <View style={{ backgroundColor: '#eee' }}>
      <RepositoryListContainer
        repositories={repositories}
        method={sortMethod}
        changeMethod={handleSortChange}
        searchBarText={searchQuery}
        searchBarOnChange={onChangeSearch}
        history={history}
      />
    </View>
  );
};

export default RepositoryList;
